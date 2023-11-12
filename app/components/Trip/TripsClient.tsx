'use client'

import { SafeReservation, SafeUserType } from "@/app/types"
import {useRouter} from 'next/navigation';
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
//component
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../Listing/ListingCard";

interface TripsClientProps{
reservations: SafeReservation[];
currentUser?: SafeUserType | null; 
}

export default function TripsClient({reservations , currentUser}: TripsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation is Cancelled");
            //to see up to date route
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => { 
            setDeletingId('');
        })
    },[router])
  return (
    <>
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you have been and Where you're going"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
                <ListingCard 
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLable="Cancel Reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
    </>
  )
}
