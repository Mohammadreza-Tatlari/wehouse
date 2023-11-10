//this action is created to load individual listing for each id of listing item
// it is a direct server component call to database

import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;
        //using listingId directly from database
        //no checking needed due to not being a API call
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            //load the user and profile information
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updateAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error)
    }
}