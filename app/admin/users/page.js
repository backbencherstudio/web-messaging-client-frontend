"use client";

import { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/app/store/api/userApi";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import toast from "react-hot-toast";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";

export default function UsersPage() {
  const router = useRouter();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  // API call with enhanced parameters
  const {
    data: usersData,
    isLoading,
    error,
  } = useGetUsersQuery({
    q: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.order,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Column definitions with sort fields - ADDED POSITION COLUMN
  const userColumns = [
    {
      label: "#",
      accessor: "position",
      sortField: "position",
    },
    {
      label: "User Name",
      accessor: "user_name",
      sortField: "name",
    },
    {
      label: "Email",
      accessor: "email",
      sortField: "email",
    },
    {
      label: "Total Messages",
      accessor: "total_messages",
      sortField: "total_messages",
    },
    {
      label: "Total Views",
      accessor: "total_views",
      sortField: "total_views",
    },
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

  // Event handlers
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (field, order) => {
    setSortConfig({ field, order });
    setCurrentPage(1); // Reset to first page on sort
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <CustomTable
        title="All Users"
        subtitle="Manage all registered users and monitor their message activity."
        columns={userColumns}
        data={usersData?.data?.data || []}
        pagination={true}
        search={true}
        serverSide={true}
        onSearch={handleSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        paginationData={usersData?.data?.pagination || {}}
        loading={isLoading}
        searchableColumns={["user_name", "email"]}
        sortableColumns={[
          "position",
          "name",
          "email",
          "total_messages",
          "total_views",
          "created_at",
        ]}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[10, 20, 50, 100]}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete user ${selectedUser?.user_name}?`}
      />
    </div>
  );
}
