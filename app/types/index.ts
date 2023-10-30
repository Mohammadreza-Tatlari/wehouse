import { User } from "@prisma/client";

//type safety for currentUser in navbar
export type SafeUserType = Omit<
User,
'createdAt' | 'updateAt' | 'emailVerified'
> & {
    createdAt: string,
    updateAt: string,
    emailVerified: string | null
}