"use client";
import { useRouter } from "next/navigation";

export default function Logo() {

//this router may get changes to link component
const router = useRouter();

  return (
    <div className="flex items-center hover:cursor-pointer"
    onClick={() => router.push('/')}>
      <span className="rounded-full p-1 text-slate-950 self-center text-2xl font-semibold whitespace-nowrap hover:shadow-md ">
        WeHouse
      </span>
    </div>
  );
}
