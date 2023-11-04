"use client";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map";
import Counter from "../Inputs/Counter";

//giving steps for filling information for renting a house
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const rentModal = useRentModal();
  //by default it is set to step 0
  const [step, setStep] = useState(STEPS.CATEGORY);

  //connect selected option to form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
        errors,
    },
    reset
  } = useForm<FieldValues>({
    //using prisma schema template listing
    defaultValues:{
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: ''
    }
  })

  // keep the values of each step to be reserved 
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')

  //for rerendering the page
  const setCustomValue = (id: string, value: any) => {
    setValue(id , value,{
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
    })
  }
  //going forward or backward on steps
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //setting the values of buttons depend on steps
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  //dynamic body content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      {/* mapping over categories from navbar/category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            {/* category input is connected to this form */}
            <CategoryInput 
            onClick={(category) => setCustomValue('category', category)} //accepted id and value
            //from watch('cateroy')
            selected={category === item.label}
            label={item.label}
            icon={item.icon}/>
          </div>
        ))}
      </div>
    </div>
  );

  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Where is your place located?"
        subtitle="Help guests find you"/>
        <CountrySelect 
        value={location}
        onChange={(value) => setCustomValue('location', value)}/>
        <Map center={location?.latlng}/>
      </div>
    )
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Share some basics about your place"
        subtitle="Amenities you offer"/>
        <Counter 
        title="Guests"
        subtitle="How many guests are allowed?"
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}/>
        <hr />
        <Counter 
        title="Rooms"
        subtitle="Number of Rooms"
        value={roomCount}
        onChange={(value) => setCustomValue('roomCount', value)}/>
        <hr />
        <Counter 
        title="Bathrooms"
        subtitle="Number of bathrooms"
        value={bathroomCount}
        onChange={(value) => setCustomValue('bathroomCount', value)}/>
      </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Wehouse your Home"
        body={bodyContent}
      />
    </div>
  );
}
