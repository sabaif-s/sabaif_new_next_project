"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import HomePage from "@/components/homepage/home";
import { useEffect,useState } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  //  if (status === "loading") {
  //   // Handle loading state
  //   return <p>Loading...</p>;
  // }

  if (status === "authenticated") {
    // User is authenticated
    return (
      <div>
         <HomePage first={"DASHBOARD"} second={false} />
        {/* <p>Welcome, {session.user?.email || "User"}!</p>
        <ul>
          <li>
            <Link href="/dashboard" className="mr-10">
              Dashboard
            </Link>
            <Link href="/profile" className="mr-10">
              Profile
            </Link>
          </li>
        </ul> */}
      </div>
    );
  }

  // User is unauthenticated
  if(status == "unauthenticated"){
    return (
      <div>
        <HomePage first={"LOGIN"} second={"REGISTER"} />
        {/* <p>Please log in or register.</p>
        <ul>
          <li>
            <Link href="/register" className="mr-10">
              Register
            </Link>
            <Link href="/login" className="mr-10">
              Login
            </Link>
          </li>
        </ul> */}
      </div>
    );
  }
  
}
