 "use client";
 import React,{useState,useEffect} from 'react'
 import dynamic from 'next/dynamic';
//  import RegisterPage from '@/components/RegisterPage'
 
 function page() {
    const RegisterMobile = dynamic(() => import('@/components/registerPage/registerMobile'), { ssr: false });
    const [isClient,setIsClient]=useState(false);
    useEffect(()=>{
      setIsClient(true);
    },[]);
    if (!isClient) {
        return (
            null
        )
    }
    else {
        return (
            <div>
               {/* <RegisterPage/> */}
               {
                   isClient && (
                       <RegisterMobile/>
                   )
               }
             
            </div>
          )
    }
   
 }
 
 export default page