export const dynamic = 'force-dynamic'
// 'automatic' | 'dynamic force' | 'error' | 'static force'

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsProps } from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmpyState from "./components/EmpyState";
import ListingCard from "./components/Listing/ListingCard";

interface HomeProps {
  searchParams: IListingsProps;
}
//async for listing action

const Home = async ({ searchParams }: HomeProps) => {
  //export default async function Home({searchParams}:HomeProps) {

  //working with currentUser so no API call to database is needed
  //because it is serverside rendering and using database directly
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  //if content is not selected
  //using ClientOnly for hydration
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmpyState showReset />
      </ClientOnly>
    );
  }

  return (
    <>
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
            {listings.map((listing) => {
              return (
                <>
                  <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                  />
                </>
              );
            })}
          </div>
        </Container>
      </ClientOnly>
    </>
  );
};

export default Home;
