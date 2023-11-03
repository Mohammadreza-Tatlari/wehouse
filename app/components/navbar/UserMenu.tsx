"use client"
import {useState , useCallback} from "react"
import { AiOutlineMenu} from 'react-icons/ai'
import { SafeUserType } from '@/app/types'
import { signOut } from 'next-auth/react'
//Components
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
//hooks
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'



interface UserMenuProp{
 currentUser?: SafeUserType | null
}

export default function UserMenu({currentUser}: UserMenuProp) {

    const [isOpen , setIsOpen] = useState<boolean>(false)

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    //changes the value of isOpen state
    const toggleOpen = useCallback(() => {
        setIsOpen(!isOpen);
        console.log("callback called");       
    },[isOpen])

    const onRent = useCallback(() => {
        //if user does not logged in
        if(!currentUser){
           return loginModal.onOpen()
        }
        //if user exists Open Rent modal
        rentModal.onOpen()
    },[currentUser, loginModal , rentModal])

  return (
    <div  className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" 
            onClick={onRent}>
                Wehouse Your Home
            </div>
            <div
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            onClick={toggleOpen}>
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                   {currentUser ? 
                   (
                    <>
                    <MenuItem 
                    onClick={() => {}} 
                    label='Trips' />
                    <MenuItem 
                    onClick={() => {}} 
                    label='favorites' />
                    <MenuItem 
                    onClick={() => {}} 
                    label='reservations' />
                    <MenuItem 
                    onClick={() => {}} 
                    label='Properties' />
                    <MenuItem 
                    onClick={rentModal.onOpen} 
                    label='Wehouse My Home' />
                    <hr />
                    <MenuItem 
                    //no get API endpoint :) at all
                    onClick={() => signOut()} 
                    label='Logout' />
                    </>
                   ) 
                   :
                    (
                    <>
                    <MenuItem 
                    onClick={loginModal.onOpen} 
                    label='Login' />
                    <MenuItem 
                    onClick={registerModal.onOpen} 
                    label='Sign Up' />
                    </>
                   )}
                   
                    
                </div>
            </div>
        )}
    </div>
  )
}
