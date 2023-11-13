
import EmpyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import FavoriteClient from "../components/Favorites/FavoriteClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmpyState
          title="No favorite is found"
          subtitle="Seems like no favorite has added"
        />
      </ClientOnly>
    );
  };

  return(
    <>
    <FavoriteClient 
    listings={listings}
    currentUser={currentUser}/>
    </>
  )
};

export default ListingPage;
