"use client";

import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { userData } from "../data";
import { FaEye, FaTrash } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
export default function UsersPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Implement your delete logic here
    console.log("Deleting user:", selectedUser);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const userColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "User Name", accessor: "userName" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "totalMessages" },
    { label: "Total views", accessor: "totalViews" },
    { label: "Last Message", accessor: "lastMessage" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/users/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
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
        columns={userColumns}
        data={userData}
        title="All Users"
        subtitle="Your report payroll sofar"
        pagination={true}
        search={true}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete user ${selectedUser?.userName}?`}
      />
    </div>
  );
}
