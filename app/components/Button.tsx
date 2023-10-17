"use client";
import { IconType, icons } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export default function Button({
  label,
  onClick,
  disabled,
  small,
  icon: Icon,
  outline,
}: ButtonProps) {
  return (
    <>
      <button
        className={` relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-2/3
      ${outline ? `bg-white` : `bg-slate-600`}
      ${outline ? `border-black` : `border-slate-600`}
      ${outline ? `text-black` : `text-white`}
      ${small ? `py-1` : `py-3`}
      ${small ? `text-sm ` : `text-base`}
      ${small ? `font-light` : `font-semibold`}
      ${small ? `border-[1px]` : `border-2`}`}
      >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {label}
      </button>
    </>
  );
}
