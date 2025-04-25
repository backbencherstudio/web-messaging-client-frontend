"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { io } from "socket.io-client";
import { format } from "date-fns";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/app/store/api/notificationApi";

// Simple socket URL derivation
const socketUrl = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, '')
  : "http://localhost:5000";

console.log("Socket URL:", socketUrl); // For debugging

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

  // RTK Query hooks from injected API
  const {
    data: notificationData,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [markAsRead] = useMarkNotificationAsReadMutation();

  const notifications = notificationData?.data || [];
  const totalPages = notificationData?.meta?.pages || 1;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    socket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (connected) {
      socket.on("notification", () => {
        // Refetch notifications when new one arrives
        refetch();
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [connected, refetch]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Empty state for no notifications
  if (!isLoading && notifications.length === 0) {
    return (
      <div className="flex justify-center bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
        <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
              No Notifications
            </h3>
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
          {!connected && (
            <span className="text-red-500 text-sm">Reconnecting...</span>
          )}
        </div>

        {isLoading ? (
          <div className="animate-pulse min-h-[50vh]">
            {[1].map((table) => (
              <div key={table} className="mt-8 h-[10vh]">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((row) => (
                      <div
                        key={row}
                        className="h-14 bg-gray-100 dark:bg-gray-700 rounded-md"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start p-4 border dark:border-[#545460] rounded-lg transition-colors cursor-pointer ${
                    notification.status === 1
                      ? "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800"
                      : "hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"
                  }`}
                  onClick={() => {
                    if (notification.status === 1) {
                      handleMarkAsRead(notification.id);
                    }
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex-shrink-0 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className="ml-4 flex-1">
                    <h3
                      className={`transition-all ${
                        notification.status === 1
                          ? "font-bold text-black dark:text-white"
                          : "font-normal text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {notification.sender_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {notification?.notification_event?.text || "No message"}
                    </p>
                    <span className="text-gray-400 text-sm mt-2 block">
                      {format(new Date(notification?.created_at), "PPp")}
                    </span>
                  </div>
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
