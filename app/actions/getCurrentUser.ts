import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    //its not a API that is why we are not throwing any error
    //this is a direct communication between database throw server Component
    //so instead of throwing error we use conditionals
    try {
        //using session and getting our session form ServerComponent (SC)
        //using this session to check the current user that has logged in
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null
        }

        //if all conditions are passed then user that match with current Logging user will be sent
        //return currentUser;
        return{  
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error: any) {
        return null;
    }
}