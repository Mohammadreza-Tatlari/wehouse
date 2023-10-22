"use client";

//packages and Icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'
import { toast } from "react-hot-toast";
//use next/navigation instead of router 
import { useRouter } from "next/navigation";

//hooks and Components
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

export default function LoginModal() {
  //don't delete this part because we need to switched from login to register model
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter()
  const [isShowingPass, setIsShowingPass] = useState<boolean>(true);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function toggleShowPass() {
    setIsShowingPass(!isShowingPass);
  }
 //ERROR IS HERE
  //Using next-auth signIn for login Operation
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("ONSUBMIT FIRED" );
    setIsloading(true);
    //using [...nextAuth] file in api/auth for credentials.
    //credentialProvider accepts email and password
    signIn('credentials',{
    ...data,
    redirect: false,
  })
  .then((callback) => {
    setIsloading(false)
    console.log("then functionality happened");
    
    if(callback?.ok){    
      toast.success("Logged In")
      //update active values
      router.refresh();
      loginModal.onClose();
    }
    if(callback?.error){
      console.log("error is " ,callback.error );
      toast.error(callback.error);
    }
  })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
        type={isShowingPass ? "password" : ""}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-row gap-1">
        <p>show Password</p>
        <input type="checkbox" onClick={toggleShowPass} />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <Button
        outline
        onClick={() => {}}
        label="Continue with Google"
        icon={FcGoogle}
      />
      <Button
        outline
        onClick={() => {}}
        label="Continue with GitHub"
        icon={AiFillGithub}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an Account?</div>
          <div
            className="text-neutral-800 font-bold cursor-pointer hover:underline"
            onClick={registerModal.onClose}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (

    <Modal
      //does not let changes while loading
      disabled={isLoading}
      //register model that's using useRegisterModal Hook
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      //is a useForm hook
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
}
