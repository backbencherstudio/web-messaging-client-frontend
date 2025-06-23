"use client";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiHospitalThin, PiNoteLight } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { RiSettingsLine, RiTimelineView } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LiaProceduresSolid } from "react-icons/lia";
import { TbMessage2, TbSocial } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import AdminHeader from "../Components/AdminComponents/AdminHeader";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";

// Menu and Bottom items
const menuItems = [
  { label: "Dashboard", href: "/admin", icon: <RxDashboard size={20} /> },
  {
    label: "Messages Management",
    href: "/admin/messages",
    icon: <TbMessage2 size={20} />,
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: <FiUsers size={20} />,
  },
  {
    label: "Contact Us Info",
    href: "/admin/contacts",
    icon: <AiOutlineUserAdd size={20} />,
  },
  {
    label: "Content Customize",
    href: "/admin/content",
    icon: <PiNoteLight size={20} />,
  },
];

const bottomMenu = [
  {
    href: "/logout",
    click: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
      >
        <path
          d="M10.5 14.3751L10.2315 15.1807C9.96675 15.975 9.10313 16.3987 8.31293 16.1222L3.75671 14.5275C2.85427 14.2116 2.25 13.3599 2.25 12.4038V6.59646C2.25 5.64034 2.85427 4.78864 3.75671 4.47278L8.31293 2.8781C9.10313 2.60154 9.96675 3.02533 10.2315 3.81955L10.5 4.62513"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.875 7.625L15.75 9.5L13.875 11.375M7.5 9.5H15.2934"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Log out",
  },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const router = useRouter()

    const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  const TopBar = () => {
    return (
      <div className=" flex items-center border-b  border-[#EAECF0]">
        <div className=" lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <HiOutlineMenuAlt1 size={26} />
          </button>
        </div>

        <div className="flex-1">
          <AdminHeader />
        </div>
      </div>
    );
  };

  return (
    <div className="flex  min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed px-4 py-6 z-30 h-screen w-72 transform dark:dark-bg border-r dark:border-gray-700  border-[#EAECF0] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center py-2">
          <Link href="/">
          <h1 className="text-2xl font-medium text-[#070707] dark:text-white  cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            SayThat.sh
          </h1>
        </Link>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => {
            const isActive = (() => {
              if (item.href === "/admin") {
                return pathname === "/admin";
              }
              return pathname.startsWith(item.href);
            })();
            return (
              <div className="mb-2" key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center text-sm font-semibold p-3 duration-300 rounded-[10px] gap-2.5 dark:text-white text-[#111827] ${
                    isActive
                      ? "bg-[#393C44] text-white"
                      : " hover:bg-[#393C44] hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Bottom menu */}
        <div className="absolute bottom-0 w-full">
          {bottomMenu.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div className="px-2 py-1" key={index}>
                <button
                onClick={handleLogout}
                  className={`flex items-center text-sm font-semibold p-3 duration-300 rounded-[10px] gap-2.5 text-[#EB3D4D] ${
                    isActive
                      ? "bg-[#393C44]"
                      : "hover:bg-[#E11D48] hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-72">
        <TopBar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
