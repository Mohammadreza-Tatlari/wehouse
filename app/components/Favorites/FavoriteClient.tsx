import { SafeLisitng, SafeUserType } from "@/app/types"

import EmpyState from "../EmpyState";
import Heading from "../Heading";
import Container from "../Container";
import ListingCard from "../Listing/ListingCard";

interface FavoriteClientProps{
    listings: SafeLisitng[];
    currentUser: SafeUserType | null;
}
export default function FavoriteClient({currentUser, listings}:FavoriteClientProps) {

    return (
    <>
    <Container>
        <Heading 
        title="Favorites"
        subtitle="List of places you have favorited"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-8">
            {listings.map((listing) => (
                <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}/>
            ))}
        </div>
    </Container>
    </>
  )
}
