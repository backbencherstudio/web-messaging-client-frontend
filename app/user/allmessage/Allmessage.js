'use client';

import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import { ChevronDown } from "lucide-react";

const messagesData = [
    {
        "id": 120,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.90",
        "date": "April 28, 2024"
    },
    {
        "id": 121,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 122,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 123,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 124,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 125,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 126,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 127,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 128,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 129,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 130,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 131,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 132,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 133,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 134,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    }
]


export default function MessageList() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(messagesData.length / itemsPerPage);

    const displayedMessages = messagesData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex lg:pt-[188px] md:pt-[156px] pt-[121px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')]   pb-[400px] ">
            <div className="max-w-[1080px] w-full mx-auto  bg-white dark:bg-[#070707] shadow-md rounded-xl border dark:border-[#545460] p-5 mt-2 ">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-[#070707] dark:text-[#FDFEFF]">My Message List</h2>
                        <p className="text-sm text-gray-500 py-2 dark:text-gray-300">Your report payroll so far</p>
                    </div>
                    <div className="flex gap-2">

                        <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-[#545460] dark:text-[#FDFEFF] rounded-md flex items-center gap-2">
                            Most Views
                            <ChevronDown size={16} />
                        </button>
                        <button className="px-4 py-4 text-sm bg-black text-white dark:bg-[#FDFEFF] dark:text-black rounded-md">New Message +</button>
                    </div>
                </div>
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-[#545460] text-left text-[#070707] dark:text-[#FDFEFF]">
                            <th className="p-4">P. No.</th>
                            <th className="p-4">Message Content</th>
                            <th className="p-4">Views</th>
                            <th className="p-4">Cost</th>
                            <th className="p-4">Time Posted</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedMessages.map((msg) => (
                            <tr key={msg.id} className="border-b border-gray-300 dark:border-gray-600">
                                <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">#{msg.id}</td>
                                <td className="p-4 truncate max-w-xs text-[#070707] dark:text-[#FDFEFF]">{msg.content}</td>
                                <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">{msg.views}</td>
                                <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">${msg.cost}</td>
                                <td className="p-4 text-[#070707] dark:text-[#D1D7E5]">{msg.date}</td>
                                <td className="p-4 flex gap-2">
                                    <button className="bg-blue-500/10 backdrop-blur-md p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                                        <FaEye />
                                    </button>
                                    <button className="bg-blue-500/10 backdrop-blur-md p-2 rounded-lg text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                                        <RiDeleteBin5Line />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>Showing {itemsPerPage} entries</span>
                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                                    ? 'bg-black text-white dark:bg-[#FDFEFF] dark:text-black'
                                    : 'bg-gray-200 dark:bg-[#545460] dark:text-[#FDFEFF]'
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