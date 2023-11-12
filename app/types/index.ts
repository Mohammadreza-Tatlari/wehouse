import { Listing, Reservation, User } from "@prisma/client";

//type safety for currentUser in navbar
export type SafeUserType = Omit<
User,
'createdAt' | 'updateAt' | 'emailVerified'
> & {
    createdAt: string,
    updateAt: string,
    emailVerified: string | null;
};

 //sanitization
export type SafeLisitng = Omit<
Listing,
'createdAt'
> & {
    createdAt: string;
};

export type SafeReservation = Omit<
Reservation,
'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeLisitng;
}