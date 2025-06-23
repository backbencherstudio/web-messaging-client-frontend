"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const hideNavbarRoutes = ["/user/login"];

  useEffect(() => {
    // Check if user is logged in by looking for the token
    const token = localStorage.getItem("token");

    // If no token and not on login page, redirect to login
    if (!token && !hideNavbarRoutes.includes(pathname)) {
      router.push("/auth/signin");
    }
  }, [pathname, router]);

  return (
    <div className="flex  bg-[#F9FAFB] dark:bg-transparent bg-cover bg-no-repeat dark:bg-[url('/bg.png')]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex-1 overflow-auto">
          <div
            className={`${
              !hideNavbarRoutes.includes(pathname) ? "" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
