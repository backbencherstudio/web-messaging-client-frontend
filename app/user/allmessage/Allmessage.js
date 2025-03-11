"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { BsExclamationCircle } from "react-icons/bs";

const messagesData = [
  {
    id: 120,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.90",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 121,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 1:45 PM",
  },
  {
    id: 122,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 123,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 124,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 125,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 126,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 127,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 128,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 129,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 130,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 131,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 132,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 133,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 12:30 PM",
  },
  {
    id: 134,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    views: 20000,
    cost: "0.95",
    date: "April 28, 2024 3:15 PM",
  },
];

export default function MessageList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter(); // Initialize router
  const itemsPerPage = 10;
  const totalPages = Math.ceil(messagesData.length / itemsPerPage);

  const displayedMessages = messagesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = () => {
    closeModal();
  };

  return (
    <div className="flex px-5 2xl:px-0 lg:pt-[120px] md:pt-[156px] pt-[121px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')]   md:pb-[100px] pb-[42px] ">
      <div className="max-w-[1080px] w-full mx-auto min-h-scree bg-white  dark:bg-[#070707] shadow-md rounded-xl border dark:border-[#545460] p-5 mt-2 ">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] dark:text-[#FDFEFF] hidden md:block">
              My Message List
            </h2>
            <h2 className="text-2xl font-semibold text-[#111827] dark:text-[#FDFEFF] md:hidden block">
              My Messages
            </h2>
            <p className="text-sm text-[#9CA3AF] py-2 dark:text-gray-300">
              Your report payroll so far
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-2">
            <button className="pl-4 pr-3 py-[9px] text-sm bg-gray-200 dark:bg-[#545460] dark:text-[#FDFEFF] rounded-md flex items-center gap-2">
              Most Views
              <ChevronDown size={16} />
            </button>
            <button className="px-5 py-3 text-sm bg-black text-white dark:bg-[#FDFEFF] dark:text-black rounded-md hidden md:block">
              New Message +
            </button>
            <button className="px-5 py-3 text-sm bg-black text-white dark:bg-[#FDFEFF] dark:text-black rounded-md block md:hidden">
              New +
            </button>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar max-h-screen ">
          <table className=" border-collapse text-sm w-[760px] md:w-full ">
            <thead>
              <tr className="bg-gray-100 dark:bg-[#545460] text-left text-[#070707] dark:text-[#FDFEFF]">
                <th className="p-4"> #</th>
                <th className="p-4">Message Content</th>
                <th className="p-4">Views</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Time Posted</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b border-gray-300 dark:border-gray-600 "
                >
                  <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">
                    {msg.id}
                  </td>
                  <td className="p-4 truncate lg:max-w-xs md:max-w-[200px] max-w-[100px] text-[#070707] dark:text-[#FDFEFF]">
                    {msg.content}
                  </td>
                  <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">
                    {msg.views}
                  </td>
                  <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">
                    ${msg.cost}
                  </td>
                  <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">
                    {msg.date}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => router.push(`messages/${msg.id}`)}
                      className="bg-blue-500/10 backdrop-blur-md p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openModal(msg)}
                      className="bg-blue-500/10 backdrop-blur-md p-2 rounded-lg text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center ">
                <div className="bg-red-50 w-20 h-20 flex justify-center items-center rounded-full">
                  <div className="bg-red-100 w-14 h-14 flex justify-center items-center rounded-full">
                    <BsExclamationCircle className="size-8 text-red-600" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 pt-4 dark:text-white">
                Delete Message
              </h3>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center p-4 text-sm text-gray-600 dark:text-gray-300">
          <span>Showing {itemsPerPage} entries</span>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-black text-white dark:bg-[#FDFEFF] dark:text-black"
                    : "bg-gray-200 dark:bg-[#545460] dark:text-[#FDFEFF]"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
