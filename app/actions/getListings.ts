import prisma from'@/app/libs/prismadb';

export default async function getListings(){
try {
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