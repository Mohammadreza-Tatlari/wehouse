'use client'
import { Reservation } from '@prisma/client'
import React, { useMemo } from 'react'
import { SafeLisitngs, SafeUserType } from '../types';

import { categories } from './navbar/Categories';
import Container from './Container';

import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';

interface ListingClientProps{
    reservation?: Reservation[];
    //beacuse SafeListing includes user, SafeUser is added in boot
    listing: SafeLisitngs & { user: SafeUserType};
    currentUser?: SafeUserType | null;

}
export default function ListingClient({
    listing,
    currentUser
}:ListingClientProps) {

    //using this const to get the exact category from the categroy array
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    },[listing.category])

  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHead 
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo 
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}/>
            </div>
        </div>
    </Container>
  )
}
