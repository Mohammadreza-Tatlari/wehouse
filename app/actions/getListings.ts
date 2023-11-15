import prisma from '@/app/libs/prismadb';

export interface IListingsProps {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;

}

export default async function getListings(params: IListingsProps) {
    try {

        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params

        let query: any = {};

        if (userId) {
            query.userId = userId
        }

        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                //greater than or equal -> gte. it transform into string and number
                //it will be used for filtering and counting rooms
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                //greater than or equal -> gte. it transform into string and number
                //it will be used for filtering and counting rooms
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                //greater than or equal -> gte. it transform into string and number
                //it will be used for filtering and counting rooms
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        //filter for dateRange and filter all dates to desired DateRange
        if (startDate && endDate) {
            //reverse filtering - find all listing daterange using NOT
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            //filtering all conflicts in reservations
                            //so if there is single day, that will be filtered
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        //because we are sending data from a server component to client component from page to listingCard.tsx
        //so iteration is needed
        const safeLisitngs = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeLisitngs;
    } catch (error: any) {
        throw new Error(error)
    }
}