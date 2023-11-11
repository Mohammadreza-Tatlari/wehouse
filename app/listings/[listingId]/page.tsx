//it is a server component and hooks cannot be used here
//thus the getListingById action is being used and access is possible directly to database via Server Component
//however parameters can be reached. and in this case params are the URLs of listingIds
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmpyState from "@/app/components/EmpyState";
import ListingClient from "@/app/components/Listing/ListingClient";

interface IParams{
    listingId?: string;
}

export default async function page({ params}: {params: IParams}) {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if(!listing){
        return (
        <ClientOnly>
            <EmpyState />
        </ClientOnly>
        )
    }
  return (
    <div>
        <ListingClient 
        listing={listing}
        currentUser={currentUser}/>
    </div>
  )
}
