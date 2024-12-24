"use client";

import { signOut } from "next-auth/react";
import React,{useEffect} from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login'); // Redirect to login page
    }
  }, [status, router]);

  const handleSignOut = () => {
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

  return (
    <div className='flex flex-col gap-y-4'>
      <div>
        Welcome to the Dashboard, {session?.user?.name || "User"}
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
