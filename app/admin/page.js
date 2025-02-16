import React from "react";
import CustomTable from "../Components/SharedComponent/CustomTable";
import { messageData, userData } from "./data";

const analyticsData = [
  {
    title: "Total Users",
    value: "5,000 active users",
    change: "-14.58%",
    changeColor: "text-red-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    ),
  },
  {
    title: "Total Messages",
    value: "15,000 messages",
    change: "+14.58%",
    changeColor: "text-cyan-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    ),
  },
  {
    title: "Last Month",
    value: "200 messages",
    change: "+14.58%",
    changeColor: "text-green-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    ),
  },
  {
    title: "Revenue Generated",
    value: "$5,200",
    change: "+14.58%",
    changeColor: "text-blue-500",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export default function AdminDashboard() {
  const messageColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "Message content", accessor: "messageContent" },
    { label: "Posted by", accessor: "postedBy" },
    { label: "Views", accessor: "views" },
    { label: "Pay", accessor: "pay" },
    { label: "Time Posted", accessor: "timePosted" },
    { label: "Ranking", accessor: "ranking" },
  ];

  const userColumns = [
    { label: "P No", accessor: "pNo" },
    { label: "User Name", accessor: "userName" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "totalMessages" },
    { label: "Total views", accessor: "totalViews" },
    { label: "Last Message", accessor: "lastMessage" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1.5 text-[#4A4C56] font-normal">
        Here are your analytic details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {analyticsData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                {item.icon}
              </svg>
              <h2 className="text-sm text-gray-500 font-medium">
                {item.title}
              </h2>
            </div>
            <p className="text-2xl font-bold mb-2">{item.value}</p>
            <span className={`text-sm ${item.changeColor}`}>{item.change}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <CustomTable
          title="Recent Messages"
          subtitle="Your report payroll sofar"
          columns={messageColumns}
          data={messageData}
        />
      </div>
      <div className="mt-8">
        <CustomTable
          title="Recent Users"
          subtitle="Your report payroll sofar"
          columns={userColumns}
          data={userData}
        />
      </div>
    </div>
  );
}
