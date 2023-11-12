import prisma from '@/app/libs/prismadb';

//going to use getReservation route in trips and reservations both
interface IParams {
    //to see all reservations
    listingId?: string;
    //to see all the trips user have
    userId?: string;
    //to see all reservation of owned Property from others
    authorId?: string;
}

export default async function getReservation(params: IParams) {

    try {

        //extracted Data
        const { listingId, userId, authorId } = params;

        //conserving information from params
        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));

        return safeReservations;
    }
    catch (error: any) {
        throw new Error(error)
    }
}