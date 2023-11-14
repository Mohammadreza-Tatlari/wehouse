//server component
//actions
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

//components
import EmpyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "../components/Properties/PropertyClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    //Survey - can be imporved
    if(!currentUser) {
        <ClientOnly>
            <EmpyState
            title="UnAuthorized User"
            subtitle="Please login to Wehouse"/>
        </ClientOnly>
    }

    //finds the current user reservations to demonstrate
    const listings = await getListings({
        userId: currentUser?.id
    });

    if(listings.length === 0) {
        return(
            <ClientOnly>
                <EmpyState 
                title="no Property is found"
                subtitle="no one has reserved yet "/>
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient 
            listings={listings}
            currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default PropertiesPage;

