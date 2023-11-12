import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams{
    reservationId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error(); 
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error("Invalid Reservation ID")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            //the only people who can delete reservation are people who own reservation or haver created listing
            //owner and requester both can delete reservations

            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }
    });

    return NextResponse.json(reservation)
}