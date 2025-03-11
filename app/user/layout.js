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
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex-1 overflow-auto">
          <div
            className={`${
              !hideNavbarRoutes.includes(pathname) ? "p-5 lg:p-6" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
