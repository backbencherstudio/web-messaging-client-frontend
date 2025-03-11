"use client";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { SkeletonLoading } from "@/app/Components/SharedComponent/SkeletonLoading";
import { useState } from "react";
import {
  useDeleteMessageMutation,
  useDeleteMultipleMessagesMutation,
  useGetUserMessagesQuery,
} from "@/app/store/api/messageApi";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
import { useGetProfileQuery } from "@/app/store/api/authApi";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";

export default function Allmessage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: user } = useGetProfileQuery();
  const {
    data: messages,
    isLoading,
    error,
  } = useGetUserMessagesQuery(user?.data?.id);
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const [deleteMultipleMessages, { isLoading: isDeletingMultiple }] =
    useDeleteMultipleMessagesMutation();
  const messageColumns = [
    // {
    //   label: (
    //     <input
    //       type="checkbox"
    //       checked={selectedMessages.length === messages?.data?.length}
    //       onChange={() => handleSelectAll(messages?.data)} // messages should be your data array
    //       className="w-4 h-4 rounded border-gray-300 cursor-pointer checked:bg-orange-500 checked:border-orange-500"
    //     />
    //   ),
    //   accessor: "select",
    //   customCell: (row) => (
    //     <input
    //       type="checkbox"
    //       checked={selectedMessages.includes(row.id)}
    //       onChange={() => handleSelect(row.id)}
    //       className="w-4 h-4 rounded border-gray-300 cursor-pointer"
    //     />
    //   ),
    // },
    { label: "P No", accessor: "message_number" },
    {
      label: "Message content",
      accessor: "message_content",
      customCell: (row) => {
        return <div className="lg:w-[300px]">{row.message_content}</div>;
      },
    },
    // { label: "Posted by", accessor: "posted_by" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Email ", accessor: "email" },
    {
      label: "Time Posted",
      accessor: "time_posted",
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
            onClick={() => router.push(`/messages/${row.id}`)}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-[#111827] dark:hover:bg-gray-700 rounded-xl p-2"
          >
            <CiEdit size={20} />
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
  const handleBulkDelete = async () => {
    if (!selectedMessages.length) return;

    if (
      confirm(
        `Are you sure you want to delete ${selectedMessages.length} messages?`
      )
    ) {
      try {
        deleteMultipleMessages(selectedMessages)
          .unwrap()
          .then((res) => {
            toast.success(
              `Successfully deleted ${selectedMessages.length} messages`
            );
            setSelectedMessages([]); // Clear selection
            // Refresh your data here
          });
      } catch (error) {
        toast.error("Failed to delete messages");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="mt-28 max-w-[1080px] mx-auto">
        <SkeletonLoading />
      </div>
    );
  }
  return (
    <div className="mt-28 max-w-[1080px] mx-auto">
      {/* <CustomPagingTable
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
      /> */}
      <CustomTable
        columns={messageColumns}
        data={messages?.data}
        title="Messages"
        subtitle="Your report payroll sofar"
        pagination={true}
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
