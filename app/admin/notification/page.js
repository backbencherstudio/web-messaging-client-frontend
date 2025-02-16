"use client";
import React from "react";
import { FaAngleDown, FaUser } from "react-icons/fa6";

const notificationData = [
  {
    id: 1,
    name: "Robert Fox",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 hr ago",
    isRead: false,
  },
  {
    id: 2,
    name: "Jacob Jones",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 hr ago",
    isRead: false,
  },
  {
    id: 3,
    name: "Arlene McCoy",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "2 hrs ago",
    isRead: true,
  },
  {
    id: 4,
    name: "Esther Howard",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 5,
    name: "Devon Lane",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "2 days ago",
    isRead: true,
  },
];

const Page = () => {
  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-medium text-gray-700 mb-6">Notifications</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4">
          {notificationData.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 flex gap-6 hover:bg-gray-50 transition-colors border m-1 rounded-md`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                <FaUser className="text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{notification.name}</h3>
                </div>
                <p className="text-[#777E90] mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {notification.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6  text-right text-[#777980] flex  gap-2 justify-end">
          <button className="hover:underline">Show More</button>
          <FaAngleDown />
        </div>
      </div>
    </div>
  );
};

export default Page;
