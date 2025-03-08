"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaCircleUser } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { messageData } from "../../data";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  useDeleteUserMessageMutation,
  useGetUserByIdQuery,
} from "@/app/store/api/userApi";
import CustomPagingTable from "@/app/Components/SharedComponent/CustomPagingTable";
import { format } from "date-fns";
import DeleteModal from "@/app/Components/SharedComponent/DeleteModal";
const ContentPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserMessage, { isLoading: isDeleting }] =
    useDeleteUserMessageMutation();
  const messageColumns = [
    { label: "Message content", accessor: "message_content" },
    { label: "Views", accessor: "views" },
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
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    deleteUserMessage(selectedUser.id);
    setIsDeleteModalOpen(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaAngleLeft /> <span className="text-gray-400">User Management</span> /
        User Details
      </div>
      <div className="bg-white p-6 rounded-lg mt-5">
        <div className="flex justify-between items-center bg-white rounded-lg">
          <h1 className=" flex items-center gap-2 text-gray-500 text-sm">
            User No #1234567890
          </h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-center">
          <div className="flex items-center gap-6">
            <FaCircleUser size={64} color="#c9ccd8" />
            <p className=" text-gray-500 flex flex-col">
              <span className="font-bold text-[#082B2E]">
                {user?.data?.user_name}
              </span>
              <span className="text-gray-400">
                <span className=" text-[12px]">{user?.data?.email}</span>
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Country</p>
            <p className="text-[#082B2E] ">
              {user?.data?.location ? user?.data?.location : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Posts</p>
            <p className="text-[#082B2E] ">{user?.data?.total_posts}</p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Views</p>
            <p className="text-[#082B2E] ">{user?.data?.total_views}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {" "}
        <CustomPagingTable
          columns={messageColumns}
          data={user?.posts}
          title="User Message List"
          subtitle="Your report payroll sofar"
          pagination={true}
          search={true}
          paginationData={{
            currentPage: user?.pagination.current_page || 1,
            totalPages: user?.pagination.total_pages || 1,
            totalItems: user?.pagination.total_items || 0,
          }}
          onPageChange={handlePageChange}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Message"
          message={`Are you sure you want to delete the message?`}
        />
      </div>
    </div>
  );
};

export default ContentPage;
