import { Listing, User } from "@prisma/client";

//type safety for currentUser in navbar
export type SafeUserType = Omit<
User,
'createdAt' | 'updateAt' | 'emailVerified'
> & {
    createdAt: string,
    updateAt: string,
    emailVerified: string | null
}
 //sanitization
export type SafeLisitngs = Omit<
Listing,
'createdAt'
> & {
    createdAt: string;
}