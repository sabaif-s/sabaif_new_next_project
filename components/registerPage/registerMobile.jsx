"use client";
import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/app/lib/axios'; 
import ScreenSize from '../screen/screen';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const  RegisterMobile = () => {
    const router=useRouter();
    const {isLargeMobile,isDesktop,isMobile,isTablet,isDesktopLarge,smallHeightMobile}=ScreenSize();
    const [previewUrl,setPreviewURL]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [reRender,setReRender]=useState(0);
    const [showEmailError,setShowEmailError]=useState(false);
    const [passWordError,setPassWordError]=useState(false);
    const [userNameError,setUserNameError]=useState(false);
    const [lastNameError,setLastNameError]=useState(false);
    const [emailError,setEmailError]=useState(false);
    const [imageError,setImageError]=useState(false);
    const [phoneError,setPhoneError]=useState(false);
    const [confirmPasswordError,setConfirmPasswordError]=useState(false);
    const [isClient,setIsClient]=useState(false);
    const { register, handleSubmit, formState: { errors },clearErrors,watch,reset } = useForm();
    const watchUserName=watch('username');
    const lastName=watch('lastName')
    const confirmPass=watch('confirmPassword');
    const password=watch('password');
    const email=watch('email');
    const phone=watch('phone');
    const [metadata, setMetadata] = useState({ width: 0, height: 0 });
    const [generateMetadata,setGenerateMetaData]=useState(false);
    const [generatedFile,setGeneratedFile]=useState(null);
    const [newWidth,setNewWidth]=useState(0);
    const [newHeight,setNewHeight]=useState(0);
    useEffect(()=>{
        console.log(metadata);
        const width=metadata.width;
        const height=metadata.height;
        const ratio=width/height;
        
        let newWidth;
        let newHeight;
        if(ratio > 1){
           newWidth=400;
           newHeight=300;
          console.log("new width:",newWidth);
          console.log("new height:",newHeight);
           
        }
        else if (ratio < 1) {
           newWidth=300;
           newHeight=400;
          console.log("new width:",newWidth);
          console.log("new height:",newHeight);
        }
        else{
           newWidth=300;
           newHeight=300;
          console.log("new width:",newWidth);
          console.log("new height:",newHeight);
        }
        
         setNewWidth(String(newWidth)+"px");
         setNewHeight(String(newHeight)+"px");
        console.log(ratio);
    },[metadata]);
    useEffect(()=>{
         
          function  generateImageMeta(url) {
             
           
             
            const img=new Image();
            img.src=url;
            img.onload = () => {
             console.log(img);
             setMetadata({
               width: img.width,
               height: img.height,
             });
             URL.revokeObjectURL(img.src); // Free memory
           };
          }
          if(generateMetadata){
            generateImageMeta(generatedFile);
          }
    },[generatedFile,generateMetadata]);
    const handleSubmitServer = async () => {
      // Basic client-side validation
      if ( !watchUserName || !email || !password ) {
          // setError("All fields are required.");
          alert("error")
          return;
      }

      if (password !== confirmPass) {
          // setError("Passwords do not match.");
          return;
      }

      try {
          // Send a POST request to the API using the axios instance
          const response = await axiosInstance.post('/api/register', {
              username: watchUserName,
              email: email,
              password: password,
          });

          if (response.status === 201) {
            toast.success("user registered successfully");
            setTimeout(() => {
               router.push('/dashboard');
            },  1000);
              // alert("User registered successfully!");
              // Optionally redirect or clear the form
          }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
          
      }
  };
    const handleFileChange=(event)=>{
        const file = event.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file);
          setGeneratedFile(url);
          setGenerateMetaData(true);
          
          console.log(file);
          console.log(url);
          setPreviewURL(url);
        }
        return () => URL.revokeObjectURL(url);
    }
    const onSubmit = (data) => {
        console.log('Form submitted successfully:', data);
        handleSubmitServer();
        // reset();
      };
      const oninvalid=(error)=>{
        console.log("Error ",error);
       
        if(error.username){
            setUserNameError(true);
        
}
else{
setUserNameError(false);
}
        if(error.password){
             setPassWordError(true);
        }
        else{
            setPassWordError(false);
        }
        if(error.confirmPassword){
            setConfirmPasswordError(true);
        }
        else{
            setConfirmPasswordError(false);
        }
        if(error.image){
                 setImageError(true);
        }
        else{
            setImageError(false);
        }
        if(error.lastName){
                    setLastNameError(true);
        }
        else{
            setLastNameError(false);
        }
        if(error.phone){
                    setPhoneError(true);
        }
        else{
            setPhoneError(false);
        }
       
        if(error.email){
            setEmailError(true);
        }
        else{
            setEmailError(false);
        }
        setShowEmailError(true);
        setTimeout(()=>{
               clearErrors();
               setConfirmPasswordError(false);
                setPassWordError(false);
                setEmailError(false);
               setShowEmailError(false);
               setPhoneError(false);
               setLastNameError(false);
               
        },2000);

      
      }
      useEffect(()=>{
                    setIsClient(true);
      },[]);
    //   useEffect(()=>{
    //     if(Object.keys(errors).length > 0){
    //       setTimeout(()=>{
    //              clearErrors();
    //              setReRender(prev => prev + 1);
    //       },2000);
    //     }
    //     console.log(errors);
             
    //   },[errors]);
      useEffect(()=>{
        if(watchUserName != undefined){
            console.log(watchUserName);
            console.log("watch");
        }
              
      },[watchUserName]);
      const validateFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
    
        if (!file) {
          return 'File is required';
        }
        if (!allowedTypes.includes(file.type)) {
          return 'Only JPG, PNG, or GIF files are allowed';
        }
        if (file.size > maxSize) {

          return 'File size must not exceed 2 MB';
        }
        return true;
      };
    return (
      <>
       {
        isClient && (
          <div className={` ${isDesktop ? "":""} ${isMobile && !isLargeMobile ? "px-6 py-2":""} ${isLargeMobile ? "py-28 px-6":""}  min-h-screen bg-gradient-to-b from-blue-300 via-purple-200 to-gray-400 ${previewUrl == "" ? "":""} animate-slideLeft relative flex justify-center items-center `} >
          {
            !isDesktop && (
              <img  src={previewUrl == "" ? null:previewUrl} 
              
              className={`${previewUrl == "" ? "hidden":" z-0 "} absolute top-0 w-full h-auto `} alt="" />
            )
          }
         
          {
            isDesktop && (
              <img  src={previewUrl == "" ? null:previewUrl} 
              style={{width:`${newWidth}`, height:`${newHeight}`}} 
              className={`${previewUrl == "" ? "hidden":" z-0 "} absolute  ${isDesktop ? "absolute top-10 right-4":"top-2"}`} alt="" />
            )
          }
            
          <form onSubmit={handleSubmit(onSubmit,oninvalid)} className= {`w-full ${isDesktop ? "scale-120":""} h-full flex justify-center`}>

         
                 <div className={` ${isDesktopLarge ? "w-1/3 mt-10":""} ${isDesktop && !isDesktopLarge ? "w-2/3 mt-10":""} ${isTablet ? "w-2/3 mt-10":""} ${smallHeightMobile ? "mt-4 ":"mt-10"}  ${isMobile ? "w-full":""} h-full relative z-20  flex flex-col justify-start items-center ${smallHeightMobile ? "px-2":"px-4"}`} >
                     <div className='w-1/2 bg-sky-100 h-10 relative rounded-t-twelve' >
                        <img src={ previewUrl == ""? '/images/354177187_2e0ac7ad-ad85-46bb-babd-218399893e7b.jpg':previewUrl} className='w-20 max-h-24 shadow-2xl absolute left-6 -top-6 border-8 border-blue-400' alt="" />
                     </div>
                     <div className={` ${smallHeightMobile ? "gap-y-4":"gap-y-6 h-full"} w-full bg-sky-100 pt-8 flex flex-col px-6`} >
                        <div className=' w-full h-16 justify-between shadow-xl items-center flex gap-x-2' >
                            <div className={` ${userNameError ? "border-red-400 border-4":"border-2 border-blue-200"} relative w-1/2 rounded-lg h-full flex justify-center items-center bg-white text-gray-600`} >
                              <img src="/images/user.png" className='w-5 h-5 absolute left-0' alt="" />
                              <input
                              autoComplete='off'
                               {...register('username', { required: 'First Name Required' })}
                              placeholder={` ${!showEmailError ? "First Name":""}`} type="text" className='text-start w-full h-full pl-6' />
                               {errors.username && showEmailError && <p className="text-red-500 animate-fadeIn text-sm absolute left-6">{errors.username.message}</p>}
                            </div>
                            <div className={` ${lastNameError ? "border-red-400 border-4":"border-2 border-blue-200"}  relative w-1/2  rounded-lg h-full flex justify-center items-center bg-white text-gray-600`} >
                            <img src="/images/father.png" className='w-5 h-5 absolute left-0' alt="" />
                            <input
                             {...register('lastName', { required: 'Last Name Required' })}
                            placeholder={` ${!showEmailError ? "Last Name":""} `} type="text" className='text-start w-full h-full pl-6'  />
                              {errors.lastName && showEmailError && <p className="text-red-500 animate-fadeIn text-sm absolute left-6">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className={` ${emailError ? "border-4 border-red-300":"border-2 border-gray-500"} w-full relative h-12 bg-white rounded-lg flex justify-start items-center shadow-xl`} >
                        <img src="/images/gmail.png" className='w-5 h-5 absolute left-2' alt="" />
                        <input
                        value={emailError ? "":email}
                        {...register('email', {
                          required: 'Email is required', // Make email field required
                          pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, // Regular expression for valid email
                            message: 'Please enter a valid email address', // Error message if pattern is not matched
                          },
                        })}
                        placeholder={` ${!showEmailError ? "E-mail":""} `} type="text" className='text-start w-full h-full pl-8'  />
                         {errors.email && showEmailError && <p className='absolute left-8 animate-fadeIn' style={{ color: 'red' }}>{errors.email.message}</p>}
                        </div>
                        <div className={` ${passWordError ? "border-red-500 border-4 bg-red-100":"border-gray-500 border-2 bg-white"} w-full relative h-12 rounded-lg flex justify-start items-center shadow-xl`} >
                        <img src="/images/padlock.png" className='w-5 h-5 absolute left-2' alt="" />
                        <input
      type={showPassword ? "text" : "password"}
      placeholder={` ${!showEmailError ? "Password":""} `} 
      value={passWordError ? "":password}
      className={` ${passWordError ? "border-red-300":"border-gray-300"} text-start w-full h-12 pl-8 pr-12 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
      })}
    />
     {errors.password && showEmailError && <p className='absolute left-8 animate-fadeIn' >{errors.password.message}</p>}
    <button
      type="button"
      onClick={()=>{
          setShowPassword((prev)=> !prev);
      }}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? (
          <img src="/images/visual.png" className='w-5 h-5' />
     
      ) : (
          <img src="/images/hide.png" className='w-5 h-5' />
      )}
    </button>
                        </div>
                        <div className={`  ${confirmPasswordError ? "border-4 border-red-300":"border-2 border-gray-500"} w-full relative h-12 bg-white rounded-lg flex justify-start items-center shadow-[0_8px_8px_rgba(0,0,0,0.1)]`} >
                        <img src="/images/padlock.png" className='w-5 h-5 absolute left-2' alt="" />
                        <input
                          {...register('confirmPassword', {
                              required: 'Confirm Password is required',
                              validate: (value) =>
                                value === password || 'Passwords do not match',
                            })}
                            value={confirmPasswordError ? "":confirmPass}
                            placeholder={` ${!showEmailError ? "Confirm Password":""} `} type="password" className='text-start w-full h-full pl-8' />
                         {errors.confirmPassword && showEmailError && <p className='absolute left-8 animate-fadeIn' >{errors.confirmPassword.message}</p>}
                        </div>
                        <div className={`w-full h-12 relative bg-white rounded-lg flex justify-start items-center ${phoneError ? "border-4 border-red-300":"border-2 border-gray-500"} shadow-xl `} >
                        <img src="/images/telephone.png" className='w-5 h-5 absolute left-2' alt="" />
                        <input 
                         {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Phone number must contain only numbers',
                          },
                          minLength: {
                            value: 10,
                            message: 'Phone number must be at least 10 digits',
                          },
                          maxLength: {
                            value: 15,
                            message: 'Phone number cannot exceed 15 digits',
                          },
                        })}
                        value={phoneError ? "":phone}
                        placeholder={` ${!showEmailError ? "Phone Number":""} `}  type="text" className='text-start w-full h-full pl-8' />
                         {errors.phone && showEmailError && <p className='text-red-300 absolute left-8 animate-fadeIn' >{errors.phone.message}</p>}
                        </div>
                        <div class="flex flex-col items-center space-x-6 w-full">
<div class="shrink-0 ">
  <img class="h-20 w-20 object-cover rounded-full" src={` ${previewUrl == "" ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80":previewUrl} `} alt="Current profile photo" />
</div>
<label class="block">
  <span class="sr-only">Choose profile photo</span>
  <input
   accept="image/*"
   {...register('image', {
     required: 'Image file is required',
     validate: (file) => validateFile(file[0]),
   })}
  onChange={handleFileChange}
  type="file" className="block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-violet-50 file:text-violet-700
    hover:file:bg-violet-100
  "/>
  {errors.image && showEmailError && <p className={'animate-fadeIn text-red-300'} >{errors.image.message}</p>}

</label>
</div>
                        <div className='w-full flex justify-between items-center px-2' >
                                   <div>
                                     <span className='text-blue-300 font-bold' >Click Here To</span>  <span className='text-blue-700' >Login</span> 
                                   </div>
                                   <div className='bg-blue-400 relative p-2 rounded-lg' >
                                       <div className='w-full h-1/2 z-10 bg-sky-400 left-0 top-0 rounded-b-lg absolute' >

                                       </div>
                                       <div className='w-full h-1/2 z-10 bg-sky-500 left-0 bottom-0 absolute' >

</div>
                                      <button className='z-20 relative' > <span className='text-white cursor-pointer ' >SUBMIT</span></button>
                                   </div>
                        </div>
                     </div>
                 </div>
                 </form>

            {/* <div className='w-full h-full pt-4 px-6 bg-white rounded-twelve flex flex-col gap-y-4' >
                 <div className='w-full h-1/6 py-6 rounded-twelve flex gap-x-4 justify-start items-start px-2 bg-yellow-200 ' >
                  <div className='flex w-1/3 items-center h-full justify-center' >
                      <span className='text-blue-300 text-2xl' >name <span className='text-red-600'>:</span> </span>
                  </div>
                  <div>
                      <input type="text" placeholder='enter name' className='w-full text-center text-2xl rounded-lg' />
                  </div>
                 </div>
                 <div className='w-full h-1/6 py-6 rounded-twelve flex gap-x-4 justify-start items-start px-2 bg-yellow-200 ' >
                  <div className='flex w-1/3 items-center h-full justify-center' >
                      <span className='text-blue-300 text-2xl' >email <span className='text-red-600'>:</span> </span>
                  </div>
                  <div>
                      <input type="email" placeholder='enter Email' className='w-full text-center text-2xl rounded-lg' />
                  </div>
                 </div>
                 <div className='w-full h-1/6 py-6 rounded-twelve flex gap-x-4 justify-start items-start px-2 bg-yellow-200 ' >
                  <div className='flex w-1/3 items-center h-full justify-center' >
                      <span className='text-blue-300 text-2xl' >country  </span>
                  </div>
                  <div>
                      <input type="text" placeholder='enter name' className='w-full text-center text-2xl rounded-lg' />
                  </div>
                 </div>
                 <div className='w-full h-1/6 py-6 rounded-twelve flex gap-x-4 justify-start items-start px-2 bg-yellow-200 ' >
                  <div className='flex w-1/3 items-center h-full justify-center' >
                      <span className='text-blue-300 text-2xl' >Password <span className='text-red-600'>:</span> </span>
                  </div>
                  <div>
                      <input type="email" placeholder='enter Email' className='w-full text-center text-2xl rounded-lg' />
                  </div>
                 </div>
                 <div className='w-full h-1/6 py-6 rounded-twelve flex gap-x-4 justify-start items-start px-2 bg-yellow-200 ' >
                  <div className='flex w-1/3 items-center h-full justify-center' >
                      <span className='text-blue-300 text-2xl' >New Password<span className='text-red-600'>:</span> </span>
                  </div>
                  <div>
                      <input type="email" placeholder='enter Email' className='w-full text-center text-2xl rounded-lg' />
                  </div>
                 </div>
                 <div className='w-full min-h-20 bg-blue-300 flex justify-center items-center' >
                  profile image
                 </div>
            </div> */}
      </div>
        )
       }
      
        
        </>
    );
};

export default  RegisterMobile;