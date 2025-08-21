"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, X } from "lucide-react";
import { io } from "socket.io-client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} from "@/app/store/api/notificationApi";

const socketUrl = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, "")
  : "http://localhost:5000";

const socket = io(socketUrl, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const NotificationDropdown = ({ isOpen, onClose, triggerRef }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const {
    data: notificationData,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({ page: 1, limit: 5 });

  const [deleteNotification] = useDeleteNotificationMutation();
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();

  // Updated response structure mapping
  const notifications = notificationData?.data?.data || [];
  const paginationData = notificationData?.data?.pagination || {};

  // ✅ NEW: Calculate dropdown position when it opens
  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const calculatePosition = () => {
        const rect = triggerRef.current.getBoundingClientRect();
        const dropdownWidth = 384; // w-96 = 384px
        const dropdownHeight = 500; // max-h-[500px]

        let top = rect.bottom + 8; // 8px gap below bell icon
        let right = window.innerWidth - rect.right; // Align with bell icon right edge

        // Handle bottom overflow
        if (top + dropdownHeight > window.innerHeight) {
          top = rect.top - dropdownHeight - 8; // Show above bell icon
        }

        // Handle right overflow
        if (right < dropdownWidth) {
          right = 16; // 16px from right edge
        }

        // Handle left overflow
        if (right > window.innerWidth - 16) {
          right = window.innerWidth - dropdownWidth - 16;
        }

        return { top, right };
      };

      setDropdownPosition(calculatePosition());
    }
  }, [isOpen, triggerRef]);

  // Socket connection
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

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

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

  const handleViewAll = () => {
    onClose();
    router.push("/user/notification");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" />

      {/* ✅ UPDATED: Dynamic positioning based on bell icon */}
      <div
        ref={dropdownRef}
        className="absolute w-96 max-h-[500px] bg-white dark:bg-[#1E1E1E] border dark:border-[#545460] rounded-lg shadow-lg overflow-hidden"
        style={{
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-[#545460]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Notifications
          </h3>
          <button
            onClick={handleDeleteAll}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="animate-pulse p-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 dark:bg-gray-700 rounded-md"
                ></div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <User className="w-12 h-12 text-gray-400 mb-3" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
                No Notifications
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                You don&apos;t have any notifications at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-3 border dark:border-[#545460] rounded-lg relative hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
                  onMouseEnter={() => setHoveredId(notification.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex-shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 dark:text-white truncate">
                      {notification.sender_name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification?.text ||
                        notification?.notification_event?.text ||
                        "No message"}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {format(new Date(notification?.created_at), "PPp")}
                    </span>
                  </div>

                  {hoveredId === notification.id && (
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t dark:border-[#545460] p-3">
            <button
              onClick={handleViewAll}
              className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
