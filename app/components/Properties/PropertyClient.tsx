'use client'

import { SafeLisitng, SafeUserType } from "@/app/types"
import {useRouter} from 'next/navigation';
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
//component
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../Listing/ListingCard";

interface PropertiesClientProps{
listings: SafeLisitng[];
currentUser?: SafeUserType | null; 
}

export default function PropertiesClient({listings , currentUser}: PropertiesClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Listing is Deleted");
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
        title="Properties"
        subtitle="list of your properties"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard 
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLable="Delete Property"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
    </>
  )
}
