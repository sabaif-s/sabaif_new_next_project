"use client";
import React, { useEffect } from 'react';
import SignInPage from '@/components/signIn/SignIn';
import { useRouter } from 'next/navigation';

function Logins() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('front') === "true") {
      router.push('/dashboard');
    }
  }, [router]);

  if (typeof window !== 'undefined' && localStorage.getItem('front') === "true") {
    return null;
  }

  return (
    <div>
      <SignInPage />
    </div>
  );
}

export default Logins;