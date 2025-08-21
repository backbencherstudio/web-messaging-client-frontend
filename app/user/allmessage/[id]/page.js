"use client";
import { useGetMessageByIdQuery } from "@/app/store/api/messageApi";
import { useParams, useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { useDeleteMessageMutation } from "@/app/store/api/messageApi";
import toast from "react-hot-toast";

export default function MessageDetail() {
  const { id } = useParams();
  const router = useRouter();

  const { data: message, isLoading, error } = useGetMessageByIdQuery(id);

  // Delete functionality
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully");
      router.push("/user/allmessage");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (isLoading) {
    return <div className="mt-28 max-w-[1080px] mx-auto">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-28 max-w-[1080px] mx-auto">Error loading message</div>
    );
  }

  return (
    <div className="flex justify-center pt-[100px] md:pt-[100px] lg:pt-[120px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
        {/* Message Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Message</h1>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-600 dark:bg-[#FFF4F70F] font-bold px-4 py-2 rounded-full text-sm hover:bg-red-200 transition-colors"
          >
            <RiDeleteBin5Line className="inline mr-2" />
            Delete
          </button>
        </div>

        {/* Message Content */}
        <p className="text-gray-700 dark:text-gray-300 mt-6">
          {message.data.message_content || message.data.body}
        </p>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex gap-24 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Time Posted: <br />
            {message.data.created || message.data.time_posted}{" "}
            {/* ✅ Use backend-formatted date */}
          </p>
          <p>
            Views: <br />
            {message.data.views}
          </p>
          {message.data.current_value && (
            <p>
              Current Value: <br />${message.data.current_value}
            </p>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
      />
    </div>
  );
}
