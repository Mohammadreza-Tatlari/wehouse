//components
import EmpyState from "../components/EmpyState";
import ClientOnly from "../components/ClientOnly";
import ReservationClient from "../components/Reservation/ReservationClient";

//actions
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmpyState title="UnAuthorized" subtitle="Login into Wehouse" />
      </ClientOnly>
    );
  }

  //getting all reservation that other people made through our property
  const reservations = await getReservation({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmpyState
          title="No reservations found"
          subtitle="Looks like you have no reservations for Property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient 
      reservations={reservations}
      currentUser={currentUser}/>
    </ClientOnly>
  );
};

export default ReservationsPage;
