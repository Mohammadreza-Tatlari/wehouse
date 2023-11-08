"use client"

import {useRouter} from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps{
 title?: string;
 subtitle?: string;
 showReset?: boolean
}

export default function EmpyState({
    title="No exact Matches has been found",
    subtitle="Try Changing or Removing filter Options",
    showReset
}:EmptyStateProps) {

    const router = useRouter()

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading 
        center
        title={title}
        subtitle={subtitle}/>
        <div className='w-48 mt-4'>
            {showReset && (
                <Button 
                //it is specific showcase for Button Component
                useIn="EmptyState"
                outline
                label='Remove all filters'
                onClick={() => { router.push('/') }}/>
            )}
        </div>
        </div>
  )
}
