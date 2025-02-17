"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import CustomTable from "@/app/Components/SharedComponent/CustomTable";
import { messageData } from "../../data";
import { RiDeleteBin5Line } from "react-icons/ri";
const ContentPage = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
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
  // Function to handle FAQ submission
  const handleSubmitFaq = () => {
    if (newQuestion && newAnswer) {
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
      setIsModalOpen(false);
    }
  };

  // Add delete function
  const handleDeleteFaq = (indexToDelete) => {
    setFaqs(faqs.filter((_, index) => index !== indexToDelete));
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
              <span className="font-bold text-[#082B2E]">John Doe</span>
              <span className="text-gray-400">
                <span className=" text-[12px]">john@gmail.com</span>
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Country</p>
            <p className="text-[#082B2E] ">United States</p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Posts</p>
            <p className="text-[#082B2E] ">100</p>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">Total Views</p>
            <p className="text-[#082B2E] ">10000</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {" "}
        <CustomTable
          columns={messageColumns}
          data={messageData}
          title={"User Message List"}
          search={true}
        />
      </div>
    </div>
  );
};

export default ContentPage;
