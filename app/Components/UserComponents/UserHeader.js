"use client";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const UserHeader = () => {
  const router = useRouter();

  return (
    <div className="bg-white px-8 py-4 shadow-sm flex justify-end items-center gap-4">
      <div className="relative w-[50%] lg:w-full lg:max-w-[315px]">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Anything"
          className=" w-full border bg-[#f9fafb] border-[#EAF1FF] rounded-lg p-2 pl-10"
        />
      </div>

      <div
        onClick={() => router.push("/user/notification")}
        className="w-10 h-10 border border-[#EAF1FF] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50"
      >
        <FaBell />
      </div>
      <div
        onClick={() => router.push("/user/profile")}
        className="w-10 h-10 border border-[#EAF1FF] bg-[#f6f8fa] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100"
      >
        <FaUser />
      </div>
    </div>
  );
};

export default UserHeader;
