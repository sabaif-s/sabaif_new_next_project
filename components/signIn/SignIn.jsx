import React,{useState,useEffect} from 'react';
import Image from 'next/image';
const SignInPage = () => {
    const [start,setStart]=useState(false);
    console.log(start);
    useEffect(()=>{
         console.log(start);
    },[])
    return (
        <div className='w-full h-screen overflow-hidden bg-gradient-to-r from-teal-900 via-teal-600 to-teal-700 pt-20 px-40 pb-28' >
                           <div className='w-full h-full bg-gray-500 flex flex-row shadow-2xl' >
                             <div className='basis-1/2 h-full bg-white pt-10 pl-12 pr-16 pb-16' >
                                    <div className='w-full h-full flex flex-col overflow-y-auto' >
                                       <div className='flex flex-row justify-start items-center gap-x-4' >
                                          <div className='w-14 h-36 bg-gradient-to-b from-teal-900 via-teal-900 to-teal-700 ' >

                                          </div>
                                          <div className='flex flex-col gap-y-0' >
                                            <span className='text-blue-800 font-bold text-3xl' >THE</span>
                                            <span className='text-blue-800 font-bold text-3xl' >STUDIO</span>
                                            <span className='text-gray-300 tracking-widest' >Your Tagline</span>
                                          </div>
                                       </div>
                                       <div className='w-full mt-16 flex flex-col' >
                                                <div className='w-full flex justify-center items-center' >
                                                    <span className='text-green-800 font-semibold text-4xl' >
                                                        Welcome Back
                                                    </span>
                                                </div>
                                                <div className='w-full pr-10 overflow-hidden flex justify-center' >
                                                    <span className='w-full word-break text-gray-400 text-center' >
                                                    Thank you welcome here for your support to login welcome back
                                                    </span>
                                                   
                                                </div>
                                       </div>
                                       <div className='w-full bg-white mt-10 flex flex-col'     style={{ boxShadow: '3px 3px 5px #d3d3d3' }} >
                                            <div className='w-full flex h-14 flex-row justify-start items-center gap-x-2 rounded-lg border-2 border-gray-100' >
                                                  <div className='w-2 h-full bg-lime-300' >

                                                  </div>
                                                  <div className='flex flex-col justify-center pb-2' >
                                                  <div className='text-gray-400' >
                                                          Email Address
                                                  </div>
                                                  <div>
                                                    <span className='text-gray-600 font-semibold' >
                                                    sebaifmuhammed33@gmail.com
                                                    </span>
                                                    
                                                  </div>
                                                  </div>
                                                 
                                            </div>
                                            <div className='w-full flex flex-row justify-start items-center gap-x-2' >
                                                  <div className='w-2 h-12 bg-white' >

                                                  </div>
                                                  <div className='flex flex-col justify-center pb-2' >
                                                  <div className='' >
                                                  <span className='text-gray-600 font-semibold' >
                                                    Password
                                                    </span>
                                                  </div>
                                                  <div>
                                                  <span className='text-gray-600 font-semibold' >
                                                    ************
                                                    </span>
                                                  </div>
                                                  </div>
                                                 
                                            </div>
                                       </div>
                                       <div className='w-full mt-6 flex justify-between items-center' >
                                               <div className='flex justify-start gap-x-2' >
                                                 <div className='border-2 border-gray-300 w-6 h-6 bg-white' >

                                                 </div>
                                                 <div>
                                                    <span className='text-gray-400'>
                                                        Remember Me
                                                        </span> 
                                                 </div>
                                               </div>
                                               <div>
                                               <span className='text-gray-800 font-semibold'>
                                                        Forgot Password
                                                        </span> 
                                               </div>
                                       </div>
                                       <div className='w-full mt-6 flex justify-start items-center' >
                                               <div className='flex justify-start mr-4' >
                                                   <button className='py-2 px-12 bg-gradient-to-r from-teal-900 to-teal-700' >
                                                                <span className='text-white' >LOGIN</span>
                                                   </button>
                                                  
                                               </div>
                                               <div>
                                               <button className='py-2 px-12 bg-white border-2 border-green-200' >
                                                                <span className='text-gray-400' >
                                                                    SIGN UP
                                                                </span>
                                                   </button>
                                               </div>
                                       </div>
                                    </div>
                             </div>

                             <div className='basis-1/2 h-full relative rounded '   style={{
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  }} >
             
                                <img src="/palm.jpg" className='w-full h-full object-cover rounded' alt="" srcset="" />
                                       <div className='w-full h-full absolute z-20 top-0 left-0 flex justify-center items-center' >
                                                         <div className='w-6 h-20 bg-gradient-to-b from-gray-300 to-gray-600' >
                                                             
                                                         </div>
                                                         <div className='ml-10'>
                                                         <div className='flex flex-col gap-y-0' >
                                            <span className='text-white font-bold text-4xl' >THE</span>
                                            <span className='text-white font-bold text-4xl' >STUDIO</span>
                                            <span className='text-gray-400 tracking-widest' >Your Tagline</span>
                                          </div>
                                                         </div>
                                       </div>
                             </div>
                           </div>
        </div>
    );
};

export default SignInPage;