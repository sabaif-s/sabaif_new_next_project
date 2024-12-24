"use client";
import Image from "next/image";
import Link from "next/link";
 
export default function Home() {
  return (
    <div>
      <ul>
        <li>
            <Link href="/register" className="mr-10">
            Register
            </Link>
            <Link href="/login" className="mr-10" >
            Login
            </Link>
            <Link href="/dashboard" className="mr-10">
            Dashboard
            </Link>
        </li>
      </ul>
    </div>
  );
}
