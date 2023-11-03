"use client";

//packages and Icons
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

//hooks and Components
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

//auth
import { signIn } from "next-auth/react";

export default function RegisterModal() {
  //getting register modal from
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isShowingPass, setIsShowingPass] = useState<boolean>(true);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function toggleShowPass() {
    setIsShowingPass(!isShowingPass);
  }

  //using axios to POST the Registeration Data to the DataBase fields are avaiable in DB
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios
      .post("/api/register", data)
      //when Process is finished. close the Modal
      .then(() => {
        toast.success("Registeration is done");
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        const resultError = JSON.stringify(error);
        toast.error(`Input are not Valid. \n log: ${resultError}`);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const toggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="welcome to Wehouse" subtitle="Create an Account" />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="name"
        label="name"
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
        onClick={() => signIn("google")}
        label="Continue with Google"
        icon={FcGoogle}
      />
      <Button
        outline
        //ISSUE 00
        //github sign in returns the value of the github account but it still does not change login status
        onClick={() => signIn("github")}
        label="Continue with GitHub"
        icon={AiFillGithub}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an Account?</div>
          <div
            className="text-neutral-800 font-bold cursor-pointer hover:underline"
            onClick={toggleModal}
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      //is a useForm hook
      onSubmit={handleSubmit(onSubmit)}
      title="Registeration"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
}
