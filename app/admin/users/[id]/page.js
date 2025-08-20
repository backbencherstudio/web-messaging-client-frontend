"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaCircleUser } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  useDeleteUserMessageMutation,
  useGetUserByIdQuery,
} from "@/app/store/api/userApi";
import { format } from "date-fns";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import toast from "react-hot-toast";

const ContentPage = () => {
  const router = useRouter();
  const { id } = useParams();

  // State management for user posts
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  // API call with enhanced parameters
  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserByIdQuery({
    id,
    q: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.order,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteUserMessage, { isLoading: isDeleting }] =
    useDeleteUserMessageMutation();

  // Column definitions for user posts
  const messageColumns = [
    {
      label: "Message content",
      accessor: "message_content",
      sortField: "message_content",
    },
    {
      label: "Views",
      accessor: "views",
      sortField: "views",
    },
    {
      label: "Time Posted",
      accessor: "time_posted",
      sortField: "created_at",
      customCell: (row) => {
        try {
          return format(new Date(row.time_posted), "dd MMMM yyyy");
        } catch (error) {
          return row.time_posted;
        }
      },
    },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/messages/${row.id}`)}
            className="bg-gray-100 dark:bg-black/20 dark:hover:bg-black/70 hover:bg-gray-200 rounded-xl p-2"
          >
            <CiEdit size={20} />
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

  // Event handlers
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (field, order) => {
    setSortConfig({ field, order });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserMessage(selectedMessage.id).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading user details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading user: {error.message}</p>
      </div>
    );
  }

  const user = userData?.data;
  const posts = userData?.posts || [];

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaAngleLeft /> <span className="text-gray-400">User Management</span> /
        User Details
      </div>

      <div className="bg-white dark:bg-nav-dark-gradient p-6 rounded-lg mt-5">
        <div className="flex justify-between items-center bg-white dark:bg-transparent rounded-lg">
          <h1 className="flex items-center gap-2 text-gray-500 dark:text-gray-200 text-sm">
            User No #{user?.user_number}
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-center">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className="text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E] dark:text-white">
                {user?.user_name}
              </span>
              <span className="text-gray-400 dark:text-white">
                <span className="text-[12px]">{user?.email}</span>
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Country</p>
            <p className="text-[#082B2E] dark:text-white">
              {user?.location ? user?.location : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Posts</p>
            <p className="text-[#082B2E] dark:text-white">
              {user?.total_posts}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Views</p>
            <p className="text-[#082B2E] dark:text-white">
              {user?.total_views}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CustomTable
          title="User Message List"
          subtitle="View and manage all messages posted by this user."
          columns={messageColumns}
          data={posts}
          pagination={true}
          search={true}
          serverSide={true}
          onSearch={handleSearch}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          searchTerm={searchTerm}
          sortConfig={sortConfig}
          paginationData={userData?.pagination || {}}
          loading={isLoading}
          searchableColumns={["message_content"]}
          sortableColumns={[
            "created_at",
            "views",
            "post_number",
            "current_value",
          ]}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={[10, 20, 50, 100]}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Message"
          message={`Are you sure you want to delete this message?`}
        />
      </div>
    </div>
  );
};

export default ContentPage;
