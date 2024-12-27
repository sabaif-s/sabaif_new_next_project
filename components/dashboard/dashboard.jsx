import { signOut } from "next-auth/react";
import React,{useEffect} from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const  DashBoard = () => {
     const router = useRouter();
      const { data: session, status } = useSession();
      console.log(session);
      console.log(status);
      // Redirect unauthenticated users to the login page
      useEffect(() => {
        if (status === 'unauthenticated' && localStorage.getItem("signed") != null) {
          router.replace('/login'); // Redirect to login page
        }
        if(status === 'unauthenticated' && localStorage.getItem("signed") == null){
            router.replace('/register');
        }
      }, [status, router]);
    
      const handleSignOut = () => {
        localStorage.setItem("signed",session.user.email);
        signOut({ callbackUrl: '/' }); // Redirect to home page after sign-out
      };
    
      if (status === 'loading') {
        // Show a loading message while the session is being fetched
        return <div>Loading...</div>;
      }
    
      if (status === 'unauthenticated') {
        // Optionally return null if the user is being redirected
        return null;
      }
      if(status == "authenticated"){
        return (
            <div className='w-full h-screen overflow-hidden bg-gray-300 flex flex-row rounded-lg' >
                <div className="fixed flex flex-row gap-x-4 top-4 left-20" >
                <button
                onClick={handleSignOut}
                className="px-6 py-3 rounded-md bg-red-600 text-white font-medium text-lg tracking-wide shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out">
    Sign Out
</button>
<button
                onClick={()=>{
                    router.push('/');
                }}
                className="px-6 py-3 rounded-md bg-red-600 text-white font-medium text-lg tracking-wide shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out">
    Home
</button>

                </div>
                
                             <div className='w-1/4 h-full flex flex-col bg-gradient-to-t from-sky-950 via-sky-950 to-sky-800 py-20 px-10' >
                                        <div className='w-full  flex flex-col items-center gap-y-2'>
                                            <div className='w-full flex justify-center items-center' >
                                                <img src="dashboardImage/profile image.jpg" className='w-40 h-40 rounded-full' alt="" />
                                            </div>
                                            <div className='w-full h-10 flex flex-row justify-center items-center' >
                                                <span className='text-2xl text-white' >
                                                    SEBAIF MUHAMMED
                                                </span>
                                            </div>
                                            <div className='w-1/2  h-2 rounded bg-white relative z-50' >
                                               
                                            </div>
                                        </div>
                                        <div className='w-full h-full flex flex-col gap-y-6 mt-4 items-center justify-center' >
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className='w-10 h-8' >
                                                   <img className='w-10 h-8' src="/dashboardImage/dashboard.png" alt="" srcset="" />
                                                </div>
                                                <div className='flex w-full flex-row justify-center' >
                                                    <span className='text-2xl text-white font-bold' >
                                                    DASHBOARD
                                                    </span>
                                                     
                                                </div>
                                            </div>
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className='w-10 h-8' >
                                                   <img className='w-10 h-8' src="/dashboardImage/favorite.png" alt="" srcset="" />
                                                </div>
                                                <div className='w-full justify-center flex flex-row' >
                                                    <span className='text-2xl  text-white font-bold' >
                                                    FAVORITE
                                                    </span>
                                                     
                                                </div>
                                            </div>
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className='w-10 h-8' >
                                                   <img className='w-10 h-8' src="/dashboardImage/message.png" alt="" srcset="" />
                                                </div>
                                                <div className='w-full justify-center flex flex-row' >
                                                    <span className='text-2xl text-white font-bold' >
                                                    CHAT
                                                    </span>
                                                     
                                                </div>
                                            </div>
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className='w-10 h-8' >
                                                   <img className='w-10 h-8' src="/dashboardImage/folder.png" alt="" srcset="" />
                                                </div>
                                                <div className='w-full justify-center flex flex-row' >
                                                    <span className='text-2xl text-white font-bold' >
                                                    FOLDER
                                                    </span>
                                                     
                                                </div>
                                            </div>
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className='w-10 h-8' >
                                                   <img className='w-10 h-8' src="/dashboardImage/setting.png" alt="" srcset="" />
                                                </div>
                                                <div className='w-full justify-center flex flex-row' >
                                                    <span className='text-2xl  text-white font-bold' >
                                                    SETTINGS
                                                    </span>
                                                     
                                                </div>
                                            </div>
                                        </div>
                             </div>
                             <div className='w-full h-full bg-blue-300 flex flex-col' >
                                                      <div className='w-full rounded-lg h-32 py-10 bg-white justify-center items-center flex flex-row justify-between px-16' >
                                                            <div>
                                                                  <span className='text-black font-semibold text-2xl' >
                                                                     DASHBOARD
                                                                  </span>
                                                            </div>
                                                            <div className='flex rounded-lg justify-center items-center gap-x-2' >
                                                               <div className='w-44 h-10 flex items-center border-2 rounded-twelve relative' >
                                                                            <div className='w-8 h-8 absolute right-4' >
                                                                                 <img src="/dashboardImage/search.png" className='w-full h-full' alt="" />
                                                                            </div>
                                                               </div> 
                                                               <div className='w-20 flex rounded-lg gap-x-4 justify-center items-center' >
                                                                    <div className='' >
                                                                        <img src="/dashboardImage/notification.png" className='w-8 h-8
                                                                        ' alt="" srcset="" />
                                                                    </div>
                                                                    <div className='' >
                                                                        <img src="/dashboardImage/navbar.png" className='w-8 h-8
                                                                        ' alt="" srcset="" />
                                                                    </div>
                                                               </div>
                                                            </div>
                                                      </div>
                                                      <div className='w-full h-full bg-violet-100 flex flex-col p-10 gap-y-10 ' >
                                                           <div className='w-full h-32 rounded-twelve bg-green-300 flex flex-row justify-center items-center' >
                                                                             <img src="/dashboardImage/2025.jpg"className="w-full h-28" alt="" />
                                                           </div>
                                                           <div className='w-full h-full  flex flex-row  gap-x-6' >
                                                                <div className='w-2/3 h-full pb-10   flex flex-col gap-y-2'>
                                                                       <div className='w-full h-1/2 rounded-lg flex flex-row gap-x-4' >
                                                                               <div className='w-1/2 h-full bg-sky-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                                       <img src="/dashboardImage/new.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                               <div className='w-1/2 h-full bg-gray-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                               <img src="/dashboardImage/new2.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                       </div>
                                                                       <div className='w-full h-1/2 rounded-lg  flex flex-row gap-x-4' >
                                                                       <div className='w-1/2 h-full  flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                       <img src="/dashboardImage/quest.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                               <div className='w-1/2 h-full bg-pink-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                               <img src="/dashboardImage/quiz.png" className='w-full h-full' alt="" />
                                                                               </div>
     
                                                                       </div>
                                                                </div>
                                                                <div className='w-1/3  h-full rounded-twelve'>
                                                                    <img src="/dashboardImage/imageBack.jpg" className='w-full h-full rounded-t-twelve' alt="" />
                                                                </div>
                                                           </div>
                                                      </div>
                             </div>
            </div>
        );
      }

   
};

export default  DashBoard;