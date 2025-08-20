"use client";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetContactQuery } from "@/app/store/api/contactApi";

const Page = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { data: contact, isLoading, error } = useGetContactQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const info = contact?.data;

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaAngleLeft /> <span className="text-gray-400">Contact Us Info</span> /
        Contact Information
      </div>
      <div className="bg-white dark:bg-nav-dark-gradient p-6 rounded-lg mt-5">
        <div className="flex justify-between items-center rounded-lg">
          <h1 className="md:text-2xl text-xl font-semibold flex items-center gap-2">
            Contact Information
          </h1>
        </div>

        <div className="border border-[#D2D2D5] p-6 rounded-[8px] mt-6">
          <p className="md:text-lg text-base font-semibold text-[#030304]">
            Subject :{" "}
            <span className="font-normal text-[#111827]">{info?.subject}</span>
          </p>
          <p className="md:text-lg text-base font-semibold text-[#030304]">
            Message{" "}
            <span className="font-normal text-[#111827]">
              {info?.message}
              <span className="text-[#A1A1A1]"> | </span>
              <span className="text-[#6b7280]">
                {info?.created /* formatted by backend */}
              </span>
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className="text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E] dark:text-white">
                {info?.name ||
                  `${info?.first_name || ""} ${info?.last_name || ""}`.trim()}
              </span>
              <span className="text-gray-400">
                <span className="text-[12px]">{info?.email}</span>
              </span>
              {info?.phone_number ? (
                <span className="text-[12px] text-gray-400">
                  {info?.phone_number}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
