"use client";
import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaCircleUser } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import {
  useDeleteMessageMutation,
  useGetMessageByIdQuery,
  useUpdateMessageMutation,
} from "@/app/store/api/messageApi";
import { format } from "date-fns";
import toast from "react-hot-toast";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";

const ContentPage = () => {
  const { id } = useParams();
  const {
    data: messageById,
    isLoading: isLoadingMessageById,
    error: errorMessageById,
  } = useGetMessageByIdQuery(id);
  const [updateMessage, { isLoading: isUpdatingMessage }] =
    useUpdateMessageMutation();
  const [deleteMessage, { isLoading: isDeletingMessage }] =
    useDeleteMessageMutation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Replace hardcoded content with state from messageById
  const [content, setContent] = useState(
    messageById?.data?.message_content || ""
  );

  // Add useEffect to update state when data is loaded
  useEffect(() => {
    if (messageById) {
      setContent(messageById.data.message_content);
    }
  }, [messageById]);

  // Add save handler
  const handleSave = async () => {
    try {
      await updateMessage({ id, message_content: content }).unwrap();
      toast.success("Message updated successfully");
      router.push("/admin/messages");
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage({ id }).unwrap();
      toast.success("Message deleted successfully");
      router.push("/admin/messages");
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (isLoadingMessageById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaAngleLeft />{" "}
        <span className="text-gray-400">Message Management</span> / Edit Message
      </div>
      <div className="bg-white dark:bg-nav-dark-gradient p-6 rounded-lg mt-5">
        <div className="flex justify-between items-center bg-white dark:bg-transparent rounded-lg">
          <h1 className="md:text-2xl text-xl font-semibold flex items-center gap-2">
            Message
          </h1>

          <div className="flex gap-4">
            {/* <button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90"
            >
              Save Changes
            </button> */}
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
        <>
          <textarea
            className="w-full h-44 p-4 border border-gray-300 dark:bg-transparent rounded-lg mt-6"
            placeholder="Write your content here..."
            value={content}
            disabled
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className=" text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E] dark:text-white">
                {messageById?.data?.posted_by}
              </span>
              <span className="text-gray-400 dark:text-white">
                <span className=" text-[12px] ">{messageById?.data?.email}</span>
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-20">
            <div>
              <p className="text-gray-400 text-[12px]">Time Posted</p>
              <p className="text-[#082B2E] dark:text-white">
                {messageById?.data?.time_posted
                  ? (() => {
                      try {
                        return format(
                          new Date(messageById.data.time_posted),
                          "MMM d, yyyy HH:mm"
                        );
                      } catch (error) {
                        console.error("Date formatting error:", error);
                        return "Invalid date";
                      }
                    })()
                  : "No date available"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-[12px]">Views</p>
              <p className="text-[#082B2E] dark:text-white ">{messageById?.data?.views}</p>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeletingMessage}
      />
    </div>
  );
};

export default ContentPage;
