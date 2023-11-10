import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback , useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUserType } from "../types";

import useLoginModal from "./useLoginModal";

interface IuseFavorite {
    listingId: string,
    currentUser?: SafeUserType | null;
}
const useFavorite = ({listingId, currentUser}:IuseFavorite) =>{
const router = useRouter();
const loginModal = useLoginModal();

const hasFavorited = useMemo(() => {

    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
},[currentUser, listingId]);

 const toggleFavorite = useCallback( async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    //if user does not exist then navigate to login modal
    if(!currentUser){
        return loginModal.onOpen();
    }

    try {
        let request;

        if(hasFavorited){
            request = () => axios.delete(`/api/favorites/${listingId}`);
        } else{
            request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        
        toast.success(hasFavorited ? 'Deleted successfully':'added successfully')
    } catch (error) {
        toast.error("adding to Favorite went wrong!")
    }
    //if user has that favorite then remove it if doesn't add it
 },[hasFavorited , listingId , currentUser , loginModal , router])

 return {
    hasFavorited,
    toggleFavorite
 }
}

export default useFavorite;