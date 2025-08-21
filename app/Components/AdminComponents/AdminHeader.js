import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGetNotificationsQuery } from "@/app/store/api/notificationApi";
import { IoNotifications } from "react-icons/io5";
import ThemeToggle from "../context/ThemeToggle";
import NotificationDropdown from "../SharedComponent/NotificationDropdown";

const AdminHeader = () => {
  const router = useRouter();
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const { data: notifications, isLoading: notificationsLoading } =
    useGetNotificationsQuery({ page: 1, limit: 5 });

  // ✅ NEW: Bell icon reference for dropdown positioning
  const bellIconRef = useRef(null);

  // Updated response structure for badge count
  const paginationData = notifications?.data?.pagination || {};

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  return (
    <>
      <div className="bg-white dark:bg-nav-dark-gradient px-8 py-4 shadow-sm flex justify-end items-center gap-4 ">
        <ThemeToggle />

        {/* ✅ UPDATED: Added ref to bell icon */}
        <button
          ref={bellIconRef}
          onClick={toggleNotificationDropdown}
          className="relative w-10 h-10 border border-[#EAF1FF] rounded-full flex items-center justify-center cursor-pointer"
        >
          <IoNotifications className="text-2xl" />
          {paginationData?.total_items > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">
                {paginationData.total_items}
              </span>
            </span>
          )}
        </button>
        <div
          onClick={() => router.push("/admin/profile")}
          className="w-10 h-10 border border-[#EAF1FF] bg-[#f6f8fa] dark:bg-nav-dark-gradient rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
        >
          <FaUser />
        </div>
      </div>

      {/* ✅ UPDATED: Pass bell icon reference to dropdown */}
      <NotificationDropdown
        isOpen={showNotificationDropdown}
        onClose={() => setShowNotificationDropdown(false)}
        triggerRef={bellIconRef}
      />
    </>
  );
};

export default AdminHeader;
