"use client";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";
import {
  useDeleteMessageMutation,
  useDeleteMultipleMessagesMutation,
  useGetUserMessagesQuery,
} from "@/app/store/api/messageApi";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { useGetProfileQuery } from "@/app/store/api/authApi";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Allmessage() {
  const router = useRouter();
  const { data: user } = useGetProfileQuery();

  // Server-side table state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    order: "desc",
  });

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Enhanced API call with parameters
  const {
    data: messagesResponse,
    isLoading,
    error,
  } = useGetUserMessagesQuery({
    userId: user?.data?.id,
    q: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.order,
  });

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const [deleteMultipleMessages, { isLoading: isDeletingMultiple }] =
    useDeleteMultipleMessagesMutation();

  // Updated column definitions with position and backend-formatted dates
  const messageColumns = [
    {
      label: "#",
      accessor: "position",
      sortField: "position",
    },
    {
      label: "Msg #",
      accessor: "post_number",
      sortField: "post_number",
    },
    {
      label: "Message content",
      accessor: "body",
      customCell: (row) => {
        return <div className="lg:w-[300px]">{row.body}</div>;
      },
    },
    {
      label: "Views",
      accessor: "views",
      sortField: "views",
    },
    {
      label: "Current Value",
      accessor: "current_value",
      sortField: "current_value",
    },
    {
      label: "Time Posted",
      accessor: "created", // ✅ Changed from created_at to backend-formatted created
      sortField: "created_at",
    },
    {
      label: "Action",
      accessor: "action",
      customCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/user/allmessage/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-gray-700 rounded-xl p-2"
          >
            <IoEyeOutline size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-[#111827] dark:hover:bg-gray-700 rounded-xl p-2"
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

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMessage(selectedMessage.id).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-28 max-w-[1080px] mx-auto">
        <SkeletonLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-28 max-w-[1080px] mx-auto">
        <div className="text-center py-8">
          <p className="text-red-500">
            Error loading messages: {error.message}
          </p>
        </div>
      </div>
    );
  }

  // Extract data from new response structure
  const messages = messagesResponse?.data?.data || [];
  const paginationData = messagesResponse?.data?.pagination || {};

  return (
    <div className="mt-28 max-w-[1080px] mx-auto">
      <CustomTable
        title="Messages"
        subtitle="Your message history and activity"
        columns={messageColumns}
        data={messages}
        pagination={true}
        search={true}
        serverSide={true}
        onSearch={handleSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        paginationData={paginationData}
        loading={isLoading}
        searchableColumns={["body", "user_display_name"]}
        sortableColumns={[
          "position",
          "created_at",
          "views",
          "current_value",
          "post_number",
        ]}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[10, 20, 50, 100]}
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
