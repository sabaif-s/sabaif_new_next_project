"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Handle loading state
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    // User is authenticated
    return (
      <div>
        <p>Welcome, {session.user?.email || "User"}!</p>
        <ul>
          <li>
            <Link href="/dashboard" className="mr-10">
              Dashboard
            </Link>
            <Link href="/profile" className="mr-10">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  // User is unauthenticated
  return (
    <div>
      <p>Please log in or register.</p>
      <ul>
        <li>
          <Link href="/register" className="mr-10">
            Register
          </Link>
          <Link href="/login" className="mr-10">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
