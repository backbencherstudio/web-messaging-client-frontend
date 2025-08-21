import React, { useState, useRef } from "react";
import { IoNotifications } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { LuUserRoundPen } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useGetProfileQuery } from "@/app/store/api/authApi";
import { FaUserCircle } from "react-icons/fa";
import { useGetNotificationsQuery } from "@/app/store/api/notificationApi";
import { RxDashboard } from "react-icons/rx";
import { decryptData } from "@/app/utils/encryption";
import NotificationDropdown from "../SharedComponent/NotificationDropdown";
import { useSocket } from "@/lib/hooks/useSocket";

const AdminHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const encryptedType = localStorage.getItem("type");
  const userType = decryptData(encryptedType);
  const { data: notifications, isLoading: notificationsLoading } =
    useGetNotificationsQuery({});

  // ✅ NEW: Bell icon reference for dropdown positioning
  const bellIconRef = useRef(null);

  // ✅ UPDATED: New response structure for badge count
  const paginationData = notifications?.data?.pagination || {};

  // ✅ NEW: Socket hook for real-time updates
  const { on, off } = useSocket();

  // ✅ NEW: Real-time notification listener
  React.useEffect(() => {
    const handleNotification = () => {
      // Refetch notifications to update badge count
      // The useGetNotificationsQuery will automatically refetch
    };

    on("notification:new", handleNotification);

    return () => {
      off("notification:new", handleNotification);
    };
  }, [on, off]);

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    // Optional: Clear any other user-related data
    // localStorage.clear(); // Be careful with this as it clears everything

    // Redirect to signin page
    window.location.href = "/auth/signin";

    // Optional: Add a success message
    toast.success("Successfully logged out");
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border-b dark:border-[#545460] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* ✅ UPDATED: Added ref to bell icon */}
          <button
            ref={bellIconRef}
            onClick={toggleNotificationDropdown}
            className="relative w-10 h-10 border border-[#EAF1FF] rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoNotifications className="text-xl text-gray-600 dark:text-gray-300" />
            {paginationData?.total_items > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {paginationData.total_items}
                </span>
              </span>
            )}
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {profile?.data?.avatar ? (
                <img
                  src={profile.data.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-400 dark:text-gray-300" />
              )}
            </div>
            <RiArrowDownSLine
              className={`text-xl text-gray-600 dark:text-gray-300 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute top-16 right-6 w-64 bg-white dark:bg-[#1E1E1E] border dark:border-[#545460] rounded-lg shadow-lg z-50">
              <div className="p-4">
                {/* Profile Section */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {profile?.data?.avatar ? (
                      <img
                        src={profile.data.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-gray-400 dark:text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {profile?.data?.name || "Admin User"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {profile?.data?.email || "admin@example.com"}
                    </p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
                  >
                    <RxDashboard className="text-lg" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
                  >
                    <LuUserRoundPen className="text-lg" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-lg transition-colors"
                  >
                    <IoDocumentTextOutline className="text-lg" />
                    <span>My Messages</span>
                  </button>

                  <hr className="border-gray-200 dark:border-[#545460]" />

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <MdOutlineLogout className="text-lg" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ UPDATED: Pass bell icon reference to dropdown */}
      <NotificationDropdown
        isOpen={showNotificationDropdown}
        onClose={() => setShowNotificationDropdown(false)}
        triggerRef={bellIconRef}
      />
    </div>
  );
};

export default AdminHeader;
