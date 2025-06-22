import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGetNotificationsQuery } from "@/app/store/api/notificationApi";
import { IoNotifications } from "react-icons/io5";
import ThemeToggle from "../context/ThemeToggle";

const AdminHeader = () => {
  const router = useRouter();
  const { data: notifications, isLoading: notificationsLoading } =
    useGetNotificationsQuery({ page: 1, limit: 5 });

  return (
      <div className="bg-white dark:bg-nav-dark-gradient px-8 py-4 shadow-sm flex justify-end items-center gap-4 ">
        {/* <div className="relative w-[50%] lg:w-full lg:max-w-[315px]">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Anything"
          className=" w-full border bg-[#f9fafb] border-[#EAF1FF] rounded-lg p-2 pl-10"
        />
      </div> */}
        <ThemeToggle />

        <div
          onClick={() => router.push("/admin/notification")}
          className="relative w-10 h-10 border border-[#EAF1FF] rounded-full flex items-center justify-center cursor-pointer "
        >
          <IoNotifications className="text-2xl" />
          {notifications?.data?.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">
                {notifications?.meta?.total}
              </span>
            </span>
          )}
        </div>
        <div
          onClick={() => router.push("/admin/profile")}
          className="w-10 h-10 border border-[#EAF1FF] bg-[#f6f8fa] dark:bg-nav-dark-gradient rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
        >
          <FaUser />
        </div>
      </div>
  );
};

export default AdminHeader;
