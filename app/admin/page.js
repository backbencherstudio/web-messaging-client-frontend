"use client";
import React from "react";
import CustomTable from "../Components/SharedComponent/CustomTable";
import { messageData, userData } from "./data";
import { useGetDashboardDataQuery } from "../store/api/leaderboardApi";
// Removing date-fns import as it's no longer needed
// import { format } from "date-fns";

export default function AdminDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();

  const analyticsData = [
    {
      title: "Total Users",
      value: dashboardData?.data?.overview?.total_users ?? 0,
      // change: "-14.58%",
      // changeColor: "text-red-500",
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
      value: dashboardData?.data?.overview?.total_posts ?? 0,
      // change: "+14.58%",
      // changeColor: "text-cyan-500",
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
      value: dashboardData?.data?.overview?.last_month_posts ?? 0,
      // change: "+14.58%",
      // changeColor: "text-green-500",
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
      value: `$${dashboardData?.data?.overview?.total_revenue ?? 0}`,
      // change: "+14.58%",
      // changeColor: "text-blue-500",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  const messageColumns = [
    { label: "P No", accessor: "position" },
    { label: "Message content", accessor: "content" },
    { label: "Posted by", accessor: "posted_by" },
    { label: "Views", accessor: "views" },
    // { label: "Pay", accessor: "pay" },
    { label: "Time Posted", accessor: "time_posted" },
    { label: "Ranking", accessor: "ranking" },
  ];

  const userColumns = [
    { label: "P No", accessor: "position" },
    { label: "User Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Total Messages", accessor: "total_messages" },
    { label: "Total views", accessor: "total_views" },
    { label: "Last Message", accessor: "last_message_date" }
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded-md mb-8"></div>

        {/* Analytics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Tables Skeleton */}
        {[1, 2].map((table) => (
          <div key={table} className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-6 w-40 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-56 bg-gray-200 rounded-md mb-6"></div>

              <div className="space-y-4">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="h-12 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
          pagination={true}
          data={dashboardData?.data?.recent_posts?.last_7_days}
        />
      </div>
      <div className="mt-8">
        <CustomTable
          title="Recent Users"
          subtitle="Your report payroll sofar"
          columns={userColumns}
          pagination={true}
          data={dashboardData?.data?.recent_users?.last_7_days}
        />
      </div>
    </div>
  );
}
