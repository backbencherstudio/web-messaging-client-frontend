'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

const notifications = [
  {
    id: 1,
    name: "Robert Fox",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "1 hour ago"
  },
  {
    id: 2,
    name: "Jacob Jones",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "2 hours ago"
  },
  {
    id: 3,
    name: "Ariene McCoy",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "3 hours ago"
  },
  {
    id: 4,
    name: "Esther Howard",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "4 hours ago"
  },
  {
    id: 5,
    name: "Devon Lane",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "5 hours ago"
  },
  {
    id: 6,
    name: "Savannah Nguyen",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    time: "6 hours ago"
  }
];

const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const displayedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex justify-center pt-[121px] md:pt-[156px] lg:pt-[188px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Notification</h1>
          {/* <div className="flex space-x-4">
            <button className="bg-gray-100 dark:bg-[#2A2A2A] px-4 py-2 rounded-full text-sm">
              Mark all as read
            </button>
            <button className="bg-red-100 text-red-600 dark:bg-[#FFF4F70F] font-bold px-4 py-2 rounded-full text-sm hover:bg-red-200">
              Clear all
            </button>
          </div> */}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {displayedNotifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-start p-4 border dark:border-[#545460] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex-shrink-0 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              
              {/* Content */}
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{notification.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                <span className="text-gray-400 text-sm mt-2 block">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-600 dark:text-gray-300">
          <span>Showing {itemsPerPage} entries</span>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
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
};

export default NotificationPage;

