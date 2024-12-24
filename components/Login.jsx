"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
 
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false, // Set to false to handle redirection manually
     email:username,
      password,
    });

    console.log(result);

    if (result?.error) {
        if(result.error == "no user"){
            alert("no such user");
        }
        else{
            console.error("Sign-in failed:", result.error);
            alert("Invalid credentials. Please try again.");
            
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

  if (status === "loading") {
    return <div>Loading...</div>; // Display a loading message while checking the session
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 text-green-400"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
