"use client";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaCircleUser } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import { useGetContactQuery } from "@/app/store/api/contactApi";
import { useGetMessageByIdQuery } from "@/app/store/api/messageApi";

const ContentPage = () => {
  const { id } = useParams();
  const { data: contact, isLoading, error } = useGetContactQuery(id);
  const {
    data: messageById,
    isLoading: isLoadingMessageById,
    error: errorMessageById,
  } = useGetMessageByIdQuery(id);
  const router = useRouter();

  // Replace hardcoded content with state from messageById
  const [content, setContent] = useState(messageById?.message || "");
  const [subject, setSubject] = useState(messageById?.subject || "");

  // Add useEffect to update state when data is loaded
  useEffect(() => {
    if (messageById) {
      setContent(messageById.message);
      setSubject(messageById.subject);
    }
  }, [messageById]);

  // Add save handler
  // const handleSave = async () => {
  //   try {
  //     await updateMessage(id, { message: content, subject });
  //     router.push("/admin/messages"); // Redirect after save
  //   } catch (error) {
  //     console.error("Failed to update message:", error);
  //   }
  // };

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaAngleLeft />{" "}
        <span className="text-gray-400">Message Management</span> / Edit Message
      </div>
      <div className="bg-white p-6 rounded-lg mt-5">
        <div className="flex justify-between items-center bg-white rounded-lg">
          <h1 className="md:text-2xl text-xl font-semibold flex items-center gap-2">
            Message
          </h1>

          <div className="flex gap-4">
            <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90">
              Save Changes
            </button>
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200">
              Delete
            </button>
          </div>
        </div>
        <>
          <textarea
            className="w-full h-44 p-4 border border-gray-300 rounded-lg mt-6"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className=" text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E]">Beginner Roay</span>
              <span className="text-gray-400">
                <span className=" text-[12px]">deanna.curtis@example.com</span>
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-20">
            <div>
              <p className="text-gray-400 text-[12px]">Time Posted</p>
              <p className="text-[#082B2E] ">April 28 , 2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-[12px]">Views</p>
              <p className="text-[#082B2E] ">10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
