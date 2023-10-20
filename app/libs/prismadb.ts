import { PrismaClient } from "@prisma/client";

//global variable of prisma is created to world over the app
//this action cause to not import prismaClient all over the application
declare global {
    var prisma: PrismaClient | undefined
}

//while in nextjs production mode is activated. each hard reload may cause 
//new prisma account thus for preventing this action NODE_ENV condition is checked
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;



