'use client'

import { toast } from "react-hot-toast"
import axios from "axios"
import { useCallback , useState } from "react"
import { useRouter } from "next/navigation"

import { SafeReservation , SafeUserType } from "@/app/types";

import Heading from "../Heading"
import Container from "../Container"
import ListingCard from "../Listing/ListingCard"

interface ReservationClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUserType | null;
}

export default function ReservationClient({reservations , currentUser}:ReservationClientProps) {

    const router = useRouter();
    const [deletingId , setDeletingId]= useState('');

    const onCancel = useCallback((id: string) => {
      setDeletingId(id);
      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled")
        router.refresh()
      })
      .catch((error: any) => {
        toast.error("Operation Failed")
        throw new Error(error);
      })
      .finally(() => {
        setDeletingId('');
      })
    },[router])

    
  return (
    <Container>
        <Heading 
        title="Reservations"
        subtitle="Bookings on your properties"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {reservations.map((reservation) => (
            <ListingCard 
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLable="Cancel guest's reservation"
            currentUser={currentUser}/>
          ))}
        </div>
    </Container>
  )
}
