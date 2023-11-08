"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import { SafeUserType } from "../types";

import useCountries from "../hooks/useCountries";
import HeartButton from "./HeartButton";
import Button from "./Button";

//using different kind of data because this component is used in different FCs
interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLable?: string;
  actionId?: string;
  currentUser?: SafeUserType | null;
}

export default function ListingCard({
  data,
  reservation,
  disabled,
  onAction,
  actionLable,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();

  //getting location fron Database via useCountries FC
  const location = getByValue(data.locationValue);

  //for listing modification depends on where ListingCard is imported
  //like trips and reservations...
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  //preserving price and demonstration
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    //reservation is from startDate to EndDate
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    //redirect to the single view of that listing
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-md">
          <Image
            className="object-cover h-full w-full group-hover:scale-110 transition"
            alt="listing"
            src={data.imageSrc}
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
            {location?.region} , {location?.label}
        </div>
        <div className="font-light text-neutral-500">
            {reservationDate || data.category} 
        </div>
        <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              ${price}
            </div>
            {!reservation && (
              <div className="font-light">night</div>
            )}
        </div>
        {onAction && actionLable && (
          <Button 
          disabled={disabled}
          small
          label={actionLable}
          onClick={handleCancel}/>
        )}
      </div>
    </div>
  );
}
