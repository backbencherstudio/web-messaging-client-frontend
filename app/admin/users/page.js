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
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/app/store/api/userApi";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";
import toast from "react-hot-toast";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";
export default function UsersPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, isLoading, error } = useGetUsersQuery(currentPage);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const userColumns = [
    // { label: "S/N", accessor: "pNo" },
    { label: "User Name", accessor: "user_name" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "total_message" },
    { label: "Total views", accessor: "total_views" },
    // { label: "Last Message", accessor: "last_message" },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/users/${row.id}`)}
            className="bg-gray-100 dark:bg-black/20 dark:hover:bg-black/70 hover:bg-gray-200 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 dark:bg-nav-dark-gradient bg-red-50 hover:bg-red-100 rounded-xl p-2"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      ),
    },
  ];
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteUser(selectedUser.id);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    toast.success("User deleted successfully");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (isLoading) {
    return <SkeletonLoading />;
  }
  return (
    <div>
      <CustomPagingTable
        columns={userColumns}
        data={users?.data}
        title="All Users"
        subtitle="Manage all registered users and monitor their message activity.”"
        pagination={true}
        search={false}
        paginationData={{
          currentPage: users?.pagination.current_page || 1,
          totalPages: users?.pagination.total_pages || 1,
          totalItems: users?.pagination.total_items || 0,
        }}
        onPageChange={handlePageChange}
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
