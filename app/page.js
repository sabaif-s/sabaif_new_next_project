"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HomePage from "@/components/homepage/home";

export default function Home() {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated" || localStorage.getItem('front') === "true") {
      setIsAuthenticated(true);
    } else if (status === "unauthenticated") {
      setIsAuthenticated(false);
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <HomePage first={"DASHBOARD"} second={false} />
      </div>
    );
  }

  return (
    <div>
      <HomePage first={"LOGIN"} second={"REGISTER"} />
    </div>
  );
}