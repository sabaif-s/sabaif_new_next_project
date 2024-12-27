import React,{useState,useEffect} from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ScreenSize from '../screen/screen';
import Image from 'next/image';
const SignInPage = () => {
    const [start,setStart]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router = useRouter();
    const {isDesktop,isDesktopLarge,isTablet,isLargeMobile,smallHeightMobile,smallWidthMobile}=ScreenSize();
    const [showInput,setShowInput]=useState(false);
    console.log(start);
    useEffect(()=>{
         console.log(start);
         if(localStorage.getItem("signed") != null){
          setEmail(localStorage.getItem("signed"));
         }
    },[])
      const handleSubmit = async () => {
        
        console.log(password);
         
    
        const result = await signIn("credentials", {
          redirect: false, // Set to false to handle redirection manually
         email,
          password,
        });
    
        console.log(result);
    
        if (result?.error) {
            if(result.error == "no user"){
                 
                toast.error("no such user");
            }
            else{
                console.error("Sign-in failed:", result.error);
                toast.error("Invalid Credentials. Please try again");
                 
                
            }
          
        } else {
            toast.success("successfully logged in",{ position: "top-right",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,});
            setTimeout(() => {
                // alert("You successfully logged in.");
                router.push("/dashboard"); 
            },  1500);
          // Redirect to dashboard after successful login
        }
      };
    return (
        <div className={`w-full h-screen ${smallWidthMobile ? "py-2":""} ${smallHeightMobile ? "px-2 py-2":""} ${isLargeMobile ? "p-4":""} ${isTablet ? "p-16":""}  ${isDesktop ? " pt-20 px-40 pb-28":""} overflow-hidden bg-gradient-to-r from-teal-900 via-teal-600 to-teal-700 `} >
                           <div className={`w-full h-full bg-gray-500 ${isDesktop ? "flex-row":"flex-col"} flex shadow-2xl`} >
                             <div className={` ${smallHeightMobile ? "p-4":""} ${isDesktopLarge ? "pt-4 pl-12 pr-16 pb-16 basis-1/2":""} ${isLargeMobile ? "p-4 w-full":""} ${isTablet ? "p-8 w-full":""}  h-full bg-white `} >
                                    <div className={` ${smallWidthMobile ? "gap-y-0":""}  ${smallHeightMobile ? "gap-y-2":""} ${isLargeMobile ? "gap-y-8":""} w-full h-full flex flex-col overflow-y-auto`} >
                                       <div className='flex flex-row justify-start items-center gap-x-4' >
                                          <div className={` ${smallWidthMobile ? "h-32":"h-36"} w-14  bg-gradient-to-b from-teal-900 via-teal-900 to-teal-700 `} >

                                          </div>
                                          <div className='flex flex-col gap-y-0' >
                                            <span className='text-blue-800 font-bold text-3xl' >THE</span>
                                            <span className='text-blue-800 font-bold text-3xl' >STUDIO</span>
                                            <span className='text-gray-300 tracking-widest' >Your Tagline</span>
                                          </div>
                                       </div>
                                       <div className='w-full mt-10 flex flex-col' >
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
                                       <div className='w-full bg-white mt-6 flex flex-col'     style={{ boxShadow: '3px 3px 5px #d3d3d3' }} >
                                            <div className='w-full flex h-14 flex-row justify-start items-center gap-x-2 rounded-lg border-2 border-gray-100' >
                                                  <div className='w-2 h-full bg-lime-300' >

                                                  </div>
                                                  <div className='flex flex-col justify-center pb-2' >
                                                  <div className='text-gray-400' >
                                                          Email Address
                                                  </div>
                                                  <div>
                                                    <span className='text-gray-600 font-semibold' >
                                                    {email}
                                                    </span>
                                                    
                                                  </div>
                                                  </div>
                                                 
                                            </div>
                                            <div
                                            onClick={()=>{
                                              setShowInput(true);
                                            }}
                                            className='w-full flex flex-row justify-start items-center gap-x-2 cursor-pointer' >
                                                  <div className='w-2 h-12 bg-white' >

                                                  </div>
                                                  <div className={` ${showInput ? "w-full h-12":""} pb-2 flex flex-col justify-center`} >
                                                    {
                                                      !showInput && (
                                                        <div className='' >
                                                        <span className='text-gray-600 font-semibold tracking-wider' >
                                                          Password
                                                          </span>
                                                        </div>
                                                      )
                                                    }
                                                 
                                                  <div>
                                                    {
                                                      showInput && (
                                                        <input type="password" 
                                                        onChange={(e)=>{
                                                                setPassword(e.target.value);
                                                        }}
                                                        value={password}
                                                        className='text-gray-500 font-semibold bg-gradient-to-r from-gray-700 to-gray-500  w-full h-12 pl-6 text-2xl focus:none tracking-widest' name="" placeholder='password' id="" />
                                                      )
                                                    }
                                                    {
                                                      !showInput && (
                                                        <span className='text-gray-600 font-semibold' >
                                                        ************
                                                        </span>
                                                      )
                                                    }
                                                 
                                                  </div>
                                                  </div>
                                                 
                                            </div>
                                       </div>
                                       <div className='w-full mt-6 flex justify-between items-center' >
                                               <div className='flex justify-start gap-x-2' >
                                                 <div className='border-2 border-gray-300 w-6 h-6 bg-white cursor-pointer' >

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
                                       <div className={` ${smallWidthMobile ? "mt-2":"mt-6"} w-full  flex justify-start items-center`} >
                                               <div className='flex justify-start mr-4' >
                                                   <button
                                                   onClick={handleSubmit}
                                                   className={` ${smallWidthMobile ? "px-6":"px-12"} py-2 bg-gradient-to-r from-teal-900 to-teal-700`} >
                                                                <span className='text-white' >LOGIN</span>
                                                   </button>
                                                  
                                               </div>
                                               <div>
                                               <button className={` ${smallWidthMobile ? "px-6":"px-12"} py-2  bg-white border-2 border-green-200`} >
                                                                <span className={` ${smallWidthMobile ? "text-sm":""} text-gray-400`} >
                                                                    SIGN UP
                                                                </span>
                                                   </button>
                                               </div>
                                       </div>
                                    </div>
                             </div>
                              {
                                isDesktop &&(
                                  <div className={`basis-1/2 h-full relative rounded `}   style={{
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
                                )
                              }
                            
                           </div>
        </div>
    );
};

export default SignInPage;