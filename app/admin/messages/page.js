"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { messageData } from "../data";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useGetAdminMessagesQuery } from "@/app/store/api/messageApi";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";

export default function MessagesPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: messages,
    isLoading,
    error,
  } = useGetAdminMessagesQuery(currentPage);
  console.log(messages);

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Implement your delete logic here
    console.log("Deleting message:", selectedMessage);
    setIsDeleteModalOpen(false);
    setSelectedMessage(null);
  };

  const messageColumns = [
    { label: "P No", accessor: "message_number" },
    { label: "Message content", accessor: "message_content" },
    { label: "Posted by", accessor: "posted_by" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Email ", accessor: "email" },
    { label: "Time Posted", accessor: "time_posted" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/messages/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
          >
            <CiEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl p-2"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <CustomPagingTable
        columns={messageColumns}
        data={messages?.data}
        title="Messages"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
        paginationData={{
          currentPage: messages?.pagination.current_page || 1,
          totalPages: messages?.pagination.total_pages || 1,
          totalItems: messages?.pagination.total_items || 0,
        }}
        onPageChange={handlePageChange}
      />

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
