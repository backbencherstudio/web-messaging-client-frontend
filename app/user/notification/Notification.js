"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { io } from "socket.io-client";
import { format } from "date-fns";

const socket = io("http://192.168.50.128:4000", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const itemsPerPage = 5;

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

  const fetchNotifications = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.50.128:4000/api/notifications?page=${page}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
        setTotalPages(data.meta.pages);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      socket.on("notification", (newNotification) => {
        setNotifications((prev) => {
          const exists = prev.some((notif) => notif.id === newNotification.id);
          if (!exists) {
            return [newNotification, ...prev];
          }
          return prev;
        });
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [connected]);

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.50.128:4000/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, status: 2 }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="flex justify-center  bg-cover bg-no-repeat dark:bg-[url('/bg.png')] pb-[500px]">
      <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          {!connected && (
            <span className="text-red-500 text-sm">Reconnecting...</span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
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
                    markAsRead(notification.id);
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
};

export default NotificationPage;
