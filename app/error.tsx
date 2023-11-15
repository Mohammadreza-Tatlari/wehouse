'use client'

import { useEffect} from 'react';
import EmpyState from './components/EmpyState';

interface ErrorStateProps{
    error: Error;
}

const ErrorState = ({error}:ErrorStateProps) => {

    useEffect(() => {
        console.log(error);
    },[error])

    return (
        <>
        <EmpyState 
        title='Path not Found!'
        subtitle='Something went Wrong'/>
        </>
    )
}

export default ErrorState