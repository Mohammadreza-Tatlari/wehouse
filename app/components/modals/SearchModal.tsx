"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";

//inputs
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";
//hooks
import useSearchModal from "@/app/hooks/useSearchModal";
//components
import Heading from "../Heading";
import Modal from "./Modal";
import Map from "../Map";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [location, setLocation] = useState<CountrySelectValue>();

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  //set all the values to the searchparams and then shows the result to the user
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    //checks whether date range exists and put them in query
    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }

    //putting updatedquery into searching URL
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    //apply filters to URL
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    roomCount,
    bathroomCount,
    guestCount,
    dateRange,
    onNext,
    params,
  ]);

  //next and back button
  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO){
        return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.INFO){
        return undefined;
    }

    return 'Back';
  },[step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading 
        title="Where do you want to go?"
        subtitle="Find your desired location"/>
        <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}/>
    <hr />
    <Map 
    center={location?.latlng}/>
    </div>

  )

  if(step === STEPS.DATE){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title="When do you plan to go"
            subtitle="Make sure everyone is free!"/>
            <Calendar 
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
            />
        </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title="More information about condition"
            subtitle="How it needs to be"/>
            <Counter 
            title="Guests"
            subtitle="How Many guests are Coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value) }/>
            <Counter 
            title="Rooms"
            subtitle="How Many Rooms needed?"
            value={roomCount}
            onChange={(value) => setRoomCount(value) }/>
            <Counter 
            title="Bathrooms"
            subtitle="How Many Bathrooms are desired?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value) }/>
        </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filter"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
}
