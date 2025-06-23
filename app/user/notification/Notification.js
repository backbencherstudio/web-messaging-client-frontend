"use client";

import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import { io } from "socket.io-client";
import { format } from "date-fns";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} from "@/app/store/api/notificationApi";

const socketUrl = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, '')
  : "http://localhost:5000";

const socket = io(socketUrl, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [connected, setConnected] = useState(false);
  const itemsPerPage = 5;
  const [hoveredId, setHoveredId] = useState(null);

  const {
    data: notificationData,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({ page: currentPage, limit: itemsPerPage });

  const [deleteNotification] = useDeleteNotificationMutation();
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();

  const notifications = notificationData?.data || [];
  const totalPages = notificationData?.meta?.pages || 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (connected) {
      socket.on("notification", () => refetch());
    }

    return () => {
      socket.off("notification");
    };
  }, [connected, refetch]);

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id).unwrap();
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotifications().unwrap();
    } catch (error) {
      console.error("Failed to delete all notifications", error);
    }
  };

  if (!isLoading && notifications.length === 0) {
    return (
      <div className="flex justify-center bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
        <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
          <div className="flex flex-col items-center justify-center py-12">
            <User className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">No Notifications</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              You don&apos;t have any notifications at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <button
            onClick={handleDeleteAll}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>

        {isLoading ? (
          <div className="animate-pulse min-h-[50vh]">
            <div className="mt-8 h-[10vh] space-y-4">
              {[...Array(5)].map((_, row) => (
                <div key={row} className="h-14 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-4 border dark:border-[#545460] rounded-lg relative hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
                  onMouseEnter={() => setHoveredId(notification.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex-shrink-0 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {notification.sender_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {notification?.notification_event?.text || "No message"}
                    </p>
                    <span className="text-gray-400 text-sm mt-2 block">
                      {format(new Date(notification?.created_at), "PPp")}
                    </span>
                  </div>

                  {hoveredId === notification.id && (
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
