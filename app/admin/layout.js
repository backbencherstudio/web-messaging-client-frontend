"use client";
import AdminHeader from "../Components/AdminComponents/AdminHeader";
import AdminNavBar from "../Components/AdminComponents/AdminNavBar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/admin/login"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add effect to close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-gray-900">
      {/* Mobile menu button */}
      {!hideNavbarRoutes.includes(pathname) && (
        <button
          className="lg:hidden fixed z-20 m-4 p-2 rounded-md bg-gray-800 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      )}

      {/* Sidebar with overlay */}
      <div
        className={`fixed inset-0 z-10 lg:relative transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Overlay - only visible on mobile */}
        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar content */}
        <div className="relative z-20 h-full max-w-[250px] dark:bg-gray-800">
          {!hideNavbarRoutes.includes(pathname) && (
            <AdminNavBar onNavigate={() => setIsSidebarOpen(false)} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {!hideNavbarRoutes.includes(pathname) && <AdminHeader />}
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
