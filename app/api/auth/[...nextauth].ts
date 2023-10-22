// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import NextAuth, { AuthOptions } from "next-auth";
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from "bcrypt";

// //libs
// import prisma from "@/app/libs/prismadb"

// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_ID as string,
//             clientSecret: process.env.GITHUB_SECRET as string
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID as string,
//             clientSecret: process.env.GOOGLE_SECRET as string
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text' },
//                 password: { label: 'password', type: 'password' },
//             },
//             //it checks the user pass and user and compare if the values are not valid it throws error
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error('user or password are NOT valid')
//                 }

//                 //find users that use credential emails
//                 //because we have generate and generation is still up prisma can find models over app
//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 })

//                 //if hashedpass is not find in user values it throws error 
//                 //hash is used for other credentials
//                 if (!user || !user?.hashedPassword) {
//                     throw new Error('Invalid credentials')
//                 }

//                 //check and compare password with bcrypt
//                 const isCorrectPassword = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );

//                 //throws error because the password user provides does not match with hasspassword of that user
//                 if (!isCorrectPassword) {
//                     throw new Error("password is not valid or User is Wrong")
//                 }
//                 return user;
//             }
//         })
//     ],

//     //it will redirect to auth page but its not yet completed
//     pages: {
//         signIn: '/'
//     },
//     //it shows logs in development environment for further debugging
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         //using JWT for security 
//         strategy: 'jwt'
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
