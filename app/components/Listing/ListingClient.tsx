"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Range } from "react-date-range";

import { SafeLisitng, SafeReservation, SafeUserType } from "../../types";

import useLoginModal from "../../hooks/useLoginModal";

import { categories } from "./../navbar/Categories";
import Container from "./../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  //beacuse SafeListing includes user, SafeUser is added in boot
  listing: SafeLisitng & { user: SafeUserType };
  currentUser?: SafeUserType | null;
}

export default function ListingClient({
  listing,
  reservations = [] ,//for safe iteration
  currentUser,
}: ListingClientProps) {
  const loginModal = useLoginModal();
  const router = useRouter();

  //iterate over reservation and check if any date is disabled
  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      //creating a range of date between start and end and pass them to dates constant
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsloading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsloading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("listing Reserved");
        setDateRange(initialDateRange);
        //Redirection to /trip
        //
        router.refresh();
      })
      .catch(() => {
        toast.error("reservation is failed");
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [totalPrice, dateRange, listing?.id, loginModal, currentUser, router]);

  //changing the total price depend on date of calender
  useEffect(() => {
    //counting the number of days
    if (dateRange.startDate && dateRange.endDate) {
      //day count may make mistake for miscalculation of few hours so CalendaryDays is replaced
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  //using this const to get the exact category from the categroy array
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation 
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disableDates}/>
          </div>
        </div>
      </div>
    </Container>
  );
}
