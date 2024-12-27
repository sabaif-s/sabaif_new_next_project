
import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/navigation';
import homeImage from '@/public/dashboardImage/home.jpg';
import houseImage from '@/public/dashboardImage/homeMobile.jpg'
import ScreenSize from '../screen/screen';
import Image from 'next/image';
 
const  HomePage = ({first,second}) => {
    const {isDesktop}=ScreenSize();
    const [renderReady,setReadyRender]=useState(false);
    const [clientReady,setClientReady]=useState(false);
    useEffect(()=>{
        if(first != ""){
            setReadyRender(true);
        }
    },[first]);
    useEffect(()=>{
           setClientReady(true);
    },[]);
    const router=useRouter();
    if(!clientReady){
        return null
    }
    if(renderReady){
        return (
            <div className='w-full  h-screen overflow-hidden flex flex-row justify-center items-center gap-x-4 ' >
                {
                    isDesktop && (
                        <Image
                        layout='fill'
                        objectFit='cover'
                        placeholder="blur"
                        alt='background image'
            
                        src={homeImage} className='absolute z-0 animate-fadeIn' />
                    )
                }
                  {
                    !isDesktop && (
                        <Image
                        layout='fill'
                        objectFit='cover'
                        placeholder="blur"
                        alt='background image'
            
                        src={houseImage} className='absolute z-0 animate-fadeIn' />
                    )
                }
    
               
    
                 
                     {/* <img src='/dashboardImage/home.jpg' className='w-full h-full rounded-lg absolute z-0' /> */}
                     <button
                     onClick={()=>{
                        if(first == "LOGIN"){
                            router.push("/login")
                        }
                        else{
                            router.push("/dashboard")
                        }
                       
                     }}
                     className='px-10 py-4 rounded-lg shadow-2xl border-2 hover:border-4 border-white shadow-gray-300 bg-gradient-to-r from-sky-950 to-sky-600 relative z-10 hover:shadow-gray-500 hover:from-sky-700 hover:to-sky-500 transition duration-300 ease-in-out'>
        <span className='text-white text-2xl font-semibold tracking-wider'>
            {first}
        </span>
    </button>
    {
        second != false && (
            <button
            onClick={()=>{
               router.push("/register")
            }}
           className='px-10 py-4 rounded-lg shadow-2xl shadow-gray-300 border-2 hover:border-4 border-gray-300  relative z-10 hover:shadow-gray-500 hover:border-white hover:bg-opacity-100 hover:bg-gradient-to-r hover:from-sky-950 hover:to-sky-400 transition duration-300 ease-in-out'>
               <span className='text-white text-2xl font-semibold tracking-wider'>
                   {second}
               </span>
           </button>
        )
    }
    
            </div>
        );
    }

};

export default  HomePage;