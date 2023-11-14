import prisma from'@/app/libs/prismadb';

export interface IListingsProps{
    userId?: string;
}

export default async function getListings(params: IListingsProps){
try {

    const {userId} = params

    let query: any = {};

    if(userId){
        query.userId = userId
    }
    
    const listings = await prisma.listing.findMany({
        orderBy:{
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
} catch (error:any) {
    throw new Error(error)
}
}