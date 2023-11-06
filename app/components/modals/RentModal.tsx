"use client";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";


import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";


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

  const router = useRouter();
  const rentModal = useRentModal();
  //by default it is set to step 0
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading , setIsLoading] = useState(false);

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
  const imageSrc = watch('imageSrc')

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

  
  //submitting all the set data to data base via axios
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE){
      return onNext();
    }

    setIsLoading(true)

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing is Created');
      router.refresh();
      //it reset entire form. it comes from useForm 
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    })
    .catch((error) => {
      toast.error("Unsuccessful Action")
      console.log("RentModal error is: " ,error);
      
    }).finally(() => {
      setIsLoading(false);
    })
  }


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

  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Add a photo of your place"
        subtitle="Show guests what the place looks like!"/>
         <ImageUpload
         value={imageSrc}
         onChange={(value) => setCustomValue('imageSrc' , value)} />
      </div>
    )
  }

  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!" />
        <Input
        id="title"
        label="title"
        disabled={isLoading}
        //from useform
        register={register}
        errors={errors}
        required/>
        <hr />
        <Input
        id="description"
        label="Description"
        disabled={isLoading}
        //from useform
        register={register}
        errors={errors}
        required/>
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Now, set your price"
        subtitle="How much do you charge per night?"/>
        <Input 
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
      </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Wehouse your Home"
        body={bodyContent}
      />
    </div>
  );
}
