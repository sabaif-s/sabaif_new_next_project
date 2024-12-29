import { signOut } from "next-auth/react";
import React,{useEffect,useState} from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import ScreenSize from "../screen/screen";
import Image from "next/image";

const  DashBoard = () => {
     const router = useRouter();
      const { data: session, status } = useSession();
      const [userName,setUserName]=useState("");
      const [imageUrl,setImageUrl]=useState("");
      const {isDesktop,isDesktopLarge,isTablet,isMobile}=ScreenSize();
      const [showNav,setShowNav]=useState(false);
      const [showOut,setShowOut]=useState(false);
      const [hideNav,setHideNav]=useState(true);
      const [accessToken,setAccessToken]=useState("");
      const [profileImage,setProfileImage]=useState("");
       
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
    useEffect(() => {
        const fetchFacebookProfileImage = async (accessToken) => {
            try {
                const response = await fetch(`https://graph.facebook.com/me/picture?access_token=${accessToken}&type=large&redirect=false`);
                const data = await response.json();
                if (data && data.data && data.data.url) {
                    console.log('Facebook profile image:', data.data.url);
                    setProfileImage(data.data.url);
                } else {
                    console.log('Error fetching Facebook profile image');
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (accessToken) {
            fetchFacebookProfileImage(accessToken);
        }
    }, [accessToken]);

      useEffect(()=>{
        const fetchData = async (email)=>{
            try {
                const res = await fetch(`/api/dashboard/${email}`,{
                    method:'GET',
                    
                })
                  const data= await res.json();
                  console.log(data);
                    if(res.status === 200){
                        console.log(data);
                        setUserName(data.user.username);
                        setImageUrl(data.user.imageUrl);
                    }
                    else{
                        console.log('error in finding user');
                    }
            } catch (error) {
                 console.log(error);
            }
        }
        if(status === 'authenticated'){
            const email = session.user.email;
            setAccessToken(session.accessToken);
            const provider=session.provider;
            localStorage.setItem("provider",provider);
            if(email){
                fetchData(email);
            }
        }
        
       
      },[session,status]);
    
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
                <div className={` ${isMobile ? "justify-center top-20 w-full":""} ${isTablet  ? "justify-center w-full top-2 pr-10":""} ${isDesktopLarge ? "left-20 top-4":""} z-50 fixed flex flex-row gap-x-4 `} >
                <button
                onClick={handleSignOut}
                className={`${isTablet || isMobile ? "px-2 py-2 text-sm rounded-sm":"px-6 py-3 text-lg rounded-md tracking-wide font-medium"} bg-gradient-to-r from-gray-400 to-blue-700 text-white shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out`}>
    Sign Out
</button>
<button
                onClick={()=>{
                    router.push('/');
                }}
                className={`${isTablet || isMobile ? "px-2 py-2 text-sm rounded-sm":"px-6 py-3 text-lg rounded-md tracking-wide font-medium"} bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out`}>
    Home
</button>

                </div>
                            
                             <div className={` ${showOut ? "animate-fadeOut":""} ${hideNav && isMobile ? "hidden":"animate-slideRight"} ${isMobile || isTablet ? "absolute left-0 z-50":""} ${showNav == isMobile ? "animate-slideRight":""} ${showNav == isTablet ? "animate-slideRight":''}  ${isDesktop ? "w-1/3":""} ${isDesktopLarge ? "w-1/4":""} h-full flex flex-col justify-center bg-gradient-to-t from-sky-950 via-sky-950 to-sky-800 py-20 px-10`} >
                                        <div className='w-full  flex flex-col items-center gap-y-2'>
                                            <div className='w-full flex justify-center items-center' style={{height:"200px"}}  >
                                            {imageUrl && (
  <div className="relative w-full" style={{ height: "160px" }}>
    <Image
      src={profileImage || imageUrl}
      alt="Profile Picture"
      layout="fill" // Makes the image fill the container
      objectFit="cover" // Ensures the image covers the container while maintaining aspect ratio
      className="rounded-full"
    />
  </div>
)}
                                               
                                                {/* <img src={imageUrl} className='w-40 h-40 rounded-full' alt="" /> */}
                                            </div>
                                            <div className='w-full h-10 flex flex-row justify-center items-center' >
                                                <span className='text-2xl text-white' >
                                                    {userName}
                                                </span>
                                            </div>
                                            <div className='w-1/2  h-2 rounded bg-white relative z-50' >
                                               
                                            </div>
                                        </div>
                                        <div className='w-full h-full flex flex-col gap-y-6 mt-4 items-center justify-center' >
                                            <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                                <div className={` ${true ? "w-10 h-8":""} `} >
                                                   <img className='w-full h-full' src="/dashboardImage/dashboard.png" alt="" srcset="" />
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
                                                      <div className={`w-full rounded-lg  ${isMobile ? "h-10":"h-32"} bg-white r items-center flex flex-row  ${isMobile ? "px-4 py-12 justify-between":" justify-center px-16 py-10"} `} >
                                                            <div>
                                                                  <span className={` ${isMobile ? "":"text-2xl"} text-black font-semibold`} >
                                                                     DASHBOARD
                                                                  </span>
                                                            </div>
                                                            <div className='flex rounded-lg justify-center items-center gap-x-2' >
                                                               <div className={` ${isMobile ? "w-36":"w-44"}  h-10 flex items-center border-2 rounded-twelve relative`} >
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
                                                                        <img
                                                                        onClick={()=>{
                                                                            if(!isDesktop){
                                                                                console.log('clicked');
                                                                                if(showNav){
                                                                                    setShowNav(false);
                                                                                    setShowOut(true);
                                                                                    setTimeout(() => {
                                                                                        setHideNav(true);
                                                                                    },  800);
                                                                                }
                                                                                else{
                                                                                setShowNav(true);
                                                                                setShowOut(false);
                                                                                setTimeout(() => {
                                                                                    setHideNav(false);
                                                                                },  800);
                                                                            }
                                                                        }}
                                                                    }
                                                                        src="/dashboardImage/navbar.png" className='w-8 h-8
                                                                        ' alt="" srcset="" />
                                                                    </div>
                                                               </div>
                                                            </div>
                                                      </div>
                                                      <div className={` ${isMobile ? "p-4 gap-y-4":"p-10 gap-y-10"} w-full h-full bg-violet-100 flex flex-col  `} >
                                                           <div className='w-full h-32 rounded-twelve bg-green-300 flex flex-row justify-center items-center' >
                                                                             <img src="/dashboardImage/2025.jpg" className="w-full h-28" alt="" />
                                                           </div>
                                                           <div className='w-full h-full  flex flex-row  gap-x-6' >
                                                                <div className={` ${isMobile ? "w-full pb-4":"w-2/3 pb-10"} h-full   flex flex-col gap-y-2`}>
                                                                       <div className={`w-full h-1/2 rounded-lg flex flex-row ${isMobile ? "gap-x-2 py-4":"gap-x-4"} `} >
                                                                               <div className='w-1/2 h-full bg-sky-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                                       <img src="/dashboardImage/new.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                               <div className='w-1/2 h-full bg-gray-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                               <img src="/dashboardImage/new2.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                       </div>
                                                                       <div className={`w-full h-1/2 rounded-lg flex flex-row ${isMobile ? "gap-x-2 py-4":"gap-x-4"} `} >
                                                                       <div className='w-1/2 h-full  flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                       <img src="/dashboardImage/quest.jpg" className='w-full h-full' alt="" />
                                                                               </div>
                                                                               <div className='w-1/2 h-full bg-pink-400 flex justify-center items-center rounded-lg shadow-lg shadow-gray-300 ' >
                                                                               <img src="/dashboardImage/quiz.png" className='w-full h-full' alt="" />
                                                                               </div>
     
                                                                       </div>
                                                                </div>
                                                                <div className={` ${isMobile ? "hidden":""} w-1/3  h-full rounded-twelve`}>
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