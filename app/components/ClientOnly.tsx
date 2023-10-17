//this component checks whether we are in SSR or not
//actaully this is a wrapper for protecting the components from hydration error of NEXTJS
"use client"
import { useEffect, useState } from "react"

interface CilentOnlyProps{
    children: React.ReactNode;
}
const ClientOnly:React.FC<CilentOnlyProps> =({children}) => {

    const [isMounted , setIsMounted] = useState<boolean>(false)

    //when the component is loaded that means it is finished by SSR and its is mounted
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted)
    {
        //can be a suspense or ...
        return null;
    }


  return (
    <div>{children}</div>
  )
}


export default ClientOnly;