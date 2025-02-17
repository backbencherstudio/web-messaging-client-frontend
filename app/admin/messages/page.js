"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { messageData } from "../data";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

export default function MessagesPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    { label: "P No", accessor: "pNo" },
    { label: "Message content", accessor: "messageContent" },
    { label: "Posted by", accessor: "postedBy" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Email ", accessor: "email" },
    { label: "Time Posted", accessor: "timePosted" },
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

  return (
    <div>
      <CustomTable
        columns={messageColumns}
        data={messageData}
        title="Messages"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
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
