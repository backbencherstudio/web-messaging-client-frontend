"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteMessageMutation,
  useDeleteMultipleMessagesMutation,
  useGetAdminMessagesQuery,
} from "@/app/store/api/messageApi";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";
import { MdDeleteSweep } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

export default function MessagesPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: messages,
    isLoading,
    error,
  } = useGetAdminMessagesQuery(currentPage);
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const [deleteMultipleMessages, { isLoading: isDeletingMultiple }] =
    useDeleteMultipleMessagesMutation();
  const [isMultiDeleteModalOpen, setIsMultiDeleteModalOpen] = useState(false);

  // Add this style for hoverable rows
  const rowClassName = (row) => {
    return `cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
      selectedMessages.includes(row.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
    }`;
  };

  const messageColumns = [
    {
      label: (
        <input
          type="checkbox"
          checked={selectedMessages.length === messages?.data?.length}
          onChange={(e) => {
            e.stopPropagation(); // Prevent row click when clicking checkbox
            handleSelectAll(messages?.data);
          }}
          className="w-4 h-4 rounded border-gray-300 cursor-pointer checked:bg-orange-500 checked:border-orange-500"
        />
      ),
      accessor: "select",
      customCell: (row) => (
        <input
          type="checkbox"
          checked={selectedMessages.includes(row.id)}
          onChange={(e) => {
            e.stopPropagation(); // Prevent row click when clicking checkbox
            handleSelect(row.id);
          }}
          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
        />
      ),
    },
    { label: "Msg #", accessor: "message_number" },
    { label: "Message content", accessor: "message_content" },
    { label: "Posted by", accessor: "posted_by" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Email ", accessor: "email" },
    // Updated time_posted to show raw data
    { label: "Time Posted", accessor: "time_posted" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => router.push(`/admin/messages/${row.id}`)}
            className="bg-gray-100 dark:bg-black/20 dark:hover:bg-black/70 hover:bg-gray-200 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 bg-red-50 dark:bg-nav-dark-gradient hover:bg-red-100 rounded-xl p-2"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      ),
    },
  ];

  // Add this handler for row clicks
  const handleRowClick = (row) => {
    handleSelect(row.id);
  };

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteMessage(selectedMessage.id);
    setIsDeleteModalOpen(false);
    setSelectedMessage(null);
    toast.success("Message deleted successfully");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelect = (messageId) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };
  const handleSelectAll = (messages) => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages?.map((msg) => msg.id));
    }
  };
  const handleBulkDelete = () => {
    if (!selectedMessages.length) return;
    setIsMultiDeleteModalOpen(true);
  };
  const confirmBulkDelete = async () => {
    try {
      await deleteMultipleMessages(selectedMessages).unwrap();
      toast.success(`Successfully deleted ${selectedMessages.length} messages`);
      setSelectedMessages([]); // Clear selection
      setIsMultiDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete messages");
    }
  };
  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="relative ">
      {selectedMessages.length > 0 && (
        <div className="mb-4 flex justify-between items-center absolute top-5 right-10 ">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <span className="text-gray-600">
              {selectedMessages.length} message
              {selectedMessages.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <MdDeleteSweep size={20} />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}
      <CustomPagingTable
        columns={messageColumns}
        data={messages?.data}
        title="Messages"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={false}
        paginationData={{
          currentPage: messages?.pagination.current_page || 1,
          totalPages: messages?.pagination.total_pages || 1,
          totalItems: messages?.pagination.total_items || 0,
        }}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        rowClassName={rowClassName}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
      />

      <DeleteModal
        isOpen={isMultiDeleteModalOpen}
        onClose={() => setIsMultiDeleteModalOpen(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Multiple Messages"
        message={`Are you sure you want to delete ${
          selectedMessages.length
        } message${selectedMessages.length > 1 ? "s" : ""}?`}
      />
    </div>
  );
}
