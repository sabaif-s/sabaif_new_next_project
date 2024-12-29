"use client";
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const CustomErrorPage = ({ error }) => {
    useEffect(() => {
        toast.error('An error occurred:');
    }, [error]);

    return (
        <div>
            <h1>Something went wrong</h1>
             
        </div>
    );
};

export default CustomErrorPage;