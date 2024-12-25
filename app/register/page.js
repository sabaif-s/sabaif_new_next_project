 "use client";
 import React,{useState,useEffect} from 'react'
 import dynamic from 'next/dynamic';
 import { useRouter } from 'next/navigation';
 import { useSession } from 'next-auth/react';
//  import RegisterPage from '@/components/RegisterPage'
 
 function page() {
    const RegisterMobile = dynamic(() => import('@/components/registerPage/registerMobile'), { ssr: false });
    const [isClient,setIsClient]=useState(false);
    const router=useRouter();
    const {data:session,status}=useSession();
    useEffect(()=>{
        
        if(status != "authenticated"){
            setIsClient(true);
        }
      },[router,status]);
      if(status == "loading"){
        return <div>LOADING</div>
      }
    if(status == "authenticated"){
      return  router.replace('/dashboard');
    }
    if(localStorage.getItem("signed") != null){
        return router.replace('/login');
    }
    else{
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
    
  
   
 }
 
 export default page