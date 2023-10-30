"use client"
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

import { SafeUserType } from "@/app/types";

interface NavbarProps{
  //using User from Prisma because it is created by npx prisma db push
  // Omit<User> is being used in SafeUserType
  currentUser?: SafeUserType | null;
}
export default function Navbar({currentUser}:NavbarProps) {
  //console.log("current user is ",{currentUser});
  
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px] py-4">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      </div>
    </div>
  );
}
