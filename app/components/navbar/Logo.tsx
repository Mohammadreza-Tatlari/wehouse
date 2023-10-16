"use client";
import { useRouter } from "next/router";

export default function Logo() {

//this router may get changes to link component
//const router = useRouter();

  return (
    <div className="flex items-center">
      <span className="self-center text-2xl font-semibold whitespace-nowrap ">
        WeHouse
      </span>
    </div>
  );
}
