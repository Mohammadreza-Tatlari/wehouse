import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons"
import qs from 'query-string'

interface CategoryBoxProps{
    icon: IconType;
    label: string;
    selected?: boolean;
}


export default function CategoryBox({icon:Icon,label,selected}:CategoryBoxProps) {

    //loading new content by click on Icons
    //it assigns a URL parameter using useRouter and useSearchParams
    //it is test for now
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {};

        //creating object out of all of current parameters
        if(params){
            currentQuery = qs.parse(params.toString())
        }

        //the label of that category going to be assinged to URL of the page
        const updatedQuery: any ={
            ...currentQuery,
            category: label
        }

        //reset the category URL if new category is selected or clicked again
        //if url is same that means user wants to reset it. it will be removed
        if(params?.get('category') === label){
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/', //path  name
            query: updatedQuery //new generated url 
        },{skipNull: true}); // filter out all empty options

        router.push(url)
    },[label, params, router])

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? `border-b-neutral-800` : `border-transparent`}
    ${selected ? `text-neutral-800` : `text-neutral-500`}`}
    onClick={handleClick}>
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}
