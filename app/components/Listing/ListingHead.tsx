'use client'

import Image from "next/image";
import useCountries from "../../hooks/useCountries";
import { SafeUserType } from "../../types";
import Heading from "./../Heading";
import HeartButton from "./../HeartButton";

interface ListingHeadProps{
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUserType | null;
}

export default function ListingHead({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}:ListingHeadProps) {
    //getting location using useCountries hook
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);

  return (
    <>
    <Heading 
    title={title}
    subtitle={`${location?.region}, ${location?.label}`}/>
    <div className="w-full h-[60vh] overflow-hidden rounded-md relative">
        <Image className="object-cover w-full"
        alt="HeadImage"
        src={imageSrc}
        fill/>
        <div className="absolute top-5 right-5">
            <HeartButton 
            listingId={id}
            currentUser={currentUser}/>
        </div>
    </div>
    </>
  )
}
