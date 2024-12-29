'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useState,useEffect} from "react";
import {toast} from "react-toastify";
import { useSession } from "next-auth/react";
 



export default function SignInPage() {
  // Handle the click for each provider
  const router=useRouter();
   
 
  const {data:session,status}=useSession();
  const [error,setError]=useState(null);
  const handleProviderSignIn = async (provider) => {
   const response =await signIn(provider);
    console.log("response",response);
   
  };
  useEffect(()=>{
      //  router.push("/providers");
      console.log(router.query);
      const params = new URLSearchParams(window.location.search);

// Get the 'callbackUrl' parameter
const callbackUrl = params.get("callbackUrl");
console.log("Callback URL:", callbackUrl); 
      console.log(window.location.pathname);
      console.log(window.location.search);
      const searchUrl=window.location.search;
      if(searchUrl.includes("error")){
        toast.error("An error occurred");
      }
       
      console.log(window.location.ancestorOrigins);
  },[]);
//   useEffect(()=>{
//      console.log("redirectFrom",redirectFrom);
// },[redirectFrom]);

  console.log(session,status);
  const handleSubmit=async (e)=>{

    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    if (result?.error) {
      // If there is an error in the result, set it
       toast.error(result.error);
    } else if (result?.ok) {
      // Redirect to a specific page if successful
      toast.success('Successfully signed in');

      router.push(result.url || "/dashboard"); // Fallback to /dashboard
    }
}

if(status === "loading"){
    return <p>Loading...</p>
}
if(status === "authenticated"){
  return  router.push("/dashboard");
}
if(status === 'unauthenticated'){


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

        {/* Credentials (Email/Password) Form */}
        <form className="space-y-4" onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 flex justify-between items-center">
          <div className="border-t border-gray-300 flex-grow mr-2" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-2" />
        </div>

        {/* Social Providers */}
        <div className="space-y-4">
          <button
            onClick={() => handleProviderSignIn('facebook')}
            className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 2.032C5.16 2.032 1.467 5.472 1.467 9.68c0 3.584 2.318 6.6 5.418 7.436V17.4H4.58v-4.05h2.305v-2.973c0-2.273 1.305-3.522 3.405-3.522 1.234 0 2.44.225 2.44.225v2.44h-1.31c-1.286 0-1.687.798-1.687 1.63v1.984h3.17l-.505 4.05h-2.665v6.356c3.1-.836 5.418-3.852 5.418-7.436 0-4.208-3.693-7.648-8.533-7.648z" />
            </svg>
            Sign in with Facebook
          </button>

          <button
            onClick={() => handleProviderSignIn('google')}
            className="w-full bg-red-600 text-white py-2 rounded-md flex justify-center items-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 2.032c2.485 0 4.697 1.038 6.276 2.684l-2.494 2.473c-1.188-.992-2.806-1.584-4.562-1.584-3.625 0-6.546 2.92-6.546 6.569s2.921 6.568 6.547 6.568c2.567 0 4.73-1.524 5.77-3.727h-3.165v-2.863h5.253v.136c.073-.316.105-.641.105-.969 0-5.32-4.314-9.532-9.529-9.532-5.293 0-9.527 4.23-9.527 9.532s4.234 9.532 9.527 9.532c4.355 0 7.986-2.676 9.526-6.443-1.195-2.421-3.469-4.167-5.963-5.125-.876-.47-1.879-.852-2.88-.883.192 2.113-.507 4.246-1.75 6.009-.296-.032-.597-.04-.895-.042-.025.208-.04.418-.04.625v1.099h1.568c.037 2.129 1.012 4.096 2.643 5.625-1.743.904-3.564 1.559-5.648 1.559-6.68 0-12.066-5.385-12.066-12.035 0-6.684 5.381-12.036 12.066-12.036z" />
            </svg>
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}
}
