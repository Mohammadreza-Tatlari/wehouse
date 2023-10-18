"use client"

//packages and Icons
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle} from 'react-icons/fc';
import { useCallback , useState} from 'react';
import { FieldValues , SubmitHandler, useForm } from "react-hook-form";

//hooks and Components
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";


export default function RegisterModal() {
    //getting register modal from 
    const registerModal = useRegisterModal();
    const [isLoading , setIsloading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
        name: "",
        email: "",
        password: "",
    }
    });
    //axios functionality for POST method will be added but from now just working on UI 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);
        axios.post('/api/register' , data)
        //when Process is finished. close the Modal
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => {
            console.log(error); 
            const resultError= JSON.stringify(error);
            toast.error(`Input are not Valid. \n log: ${resultError}`)
        })
        .finally(() => {
            setIsloading(false);
        })
    }

    const bodyContent =
    (
        <div className="flex flex-col gap-4">
            <Heading 
            title="welcome to Wehouse"
            subtitle="Create an Account"
            />
            <Input
            id="email"
            label="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required />

            <Input
            id="name"
            label="name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required />

            <Input
            id="password"
            label="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required />
        </div>
    )

    const footerContent =
    (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button
            outline
            onClick={() => {}}
            label="Continue with Google"
            icon={FcGoogle}/>
            <Button
            outline
            onClick={() => {}}
            label="Continue with GitHub"
            icon={AiFillGithub}/>
            <div className=" text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an Account?</div>
                    <div className="text-neutral-800 font-bold cursor-pointer hover:underline"
                    onClick={registerModal.onClose}>
                    Login
                    </div>
                </div>
            </div>
        </div>    
    )

  return (
    <Modal 
    //does not let changes while loading
    disabled={isLoading}
    //register model that's using useRegisterModal Hook
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    //is a useForm hook
    onSubmit={handleSubmit(onSubmit)}
    title="Register"
    actionLabel="Continue"
    body={bodyContent}
    footer={footerContent}
      />
  )
}
