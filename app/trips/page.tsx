//server component
//actions
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";

//components
import EmpyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "../components/Trip/TripsClient";

const TripsPage = async () => {
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
    const reservations = await getReservation({
        userId: currentUser?.id
    });

    if(reservations.length === 0) {
        return(
            <ClientOnly>
                <EmpyState 
                title="No trip is found"
                subtitle="you haven't reserve any trip yet? "/>
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripsClient 
            reservations={reservations}
            currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default TripsPage;

