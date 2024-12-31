"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function Page() {
  const RegisterMobile = dynamic(() => import('@/components/registerPage/registerMobile'), { ssr: false });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status !== "authenticated" && localStorage.getItem('front') == "true") {
  //     setIsClient(true);
  //   }
  // }, [status]);
  useEffect(()=>{
          if (typeof window !== "undefined") {
            setIsClient(true);
          }
  },[]);

  useEffect(() => {
    if (status === "authenticated" || localStorage.getItem("front") === "true") {
      router.replace('/dashboard');
    } else if (localStorage.getItem("signed") !== null && localStorage.getItem("provider") === "credentials") {
      router.replace('/login');
    } else if (localStorage.getItem("signed") && localStorage.getItem("provider") !== "credentials") {
      router.replace('/providers');
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>LOADING</div>;
  }

  if (!isClient) {
    console.log("null");
    return null;
  }

  return (
    <div>
      <RegisterMobile />
    </div>
  );
}

export default Page;