 import bcrypt from 'bcrypt';

 import prisma from "@/app/libs/prismadb";
 import {NextResponse } from 'next/server';


 export async function POST(
    request: Request
 ){
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body;

    //hashes the password of the POST body
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma?.user.create({
        data: {
            email,
            name,
            //storing hashed password in database
            hashedPassword
        }
    });

    return NextResponse.json(user)
 }