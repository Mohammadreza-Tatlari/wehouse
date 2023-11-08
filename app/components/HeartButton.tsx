'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUserType } from "../types";

interface HeartButtonProps{
    listingId: string;
    currentUser?: SafeUserType | null;
}

export default function HeartButton({
    listingId,
    currentUser
}:HeartButtonProps) {
    const hasFavorited = true;
    const toggleFavorite= () => {};


  return (
    <div className="relative hover:opacity-80 transition cursor-pointer"
    onClick={toggleFavorite}>
        <AiOutlineHeart className="fill-slate-400 absolute "
        size={30} />
        <AiFillHeart className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-300/60"}`}
        size={30}/>
    </div>
  )
}
