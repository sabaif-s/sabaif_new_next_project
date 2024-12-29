'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function Login() {
  const [error, setError] = useState(null); // To handle and display errors
  const router = useRouter();
  const [clickedFacebook, setClickedFacebook] = useState(false);
  // For navigating after successful login
useEffect(()=>{
    const handleFacebookSignIn = async () => {
        try {
          const result = await signIn("facebook"); // Prevent automatic redirect
            console.log(result);
          if (result?.error) {
            // If there is an error in the result, set it
            setError(result.error);
          } else if (result?.ok) {
            // Redirect to a specific page if successful
            router.push(result.url); // Fallback to /dashboard
          }
        } catch (err) {
          // Log and handle unexpected errors
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred. Please try again later.");
        }
      };
    if(clickedFacebook){
        handleFacebookSignIn();
    }
},[clickedFacebook])


  return (
    <div>
      <button
      onClick={()=>setClickedFacebook(true)}
      >Sign In with Facebook</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
    </div>
  );
}
