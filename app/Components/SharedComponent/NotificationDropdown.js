"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, X } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  FloatingPortal,
  autoUpdate,
  useFloating,
  offset,
  flip,
  shift,
  size,
} from "@floating-ui/react";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} from "@/app/store/api/notificationApi";
import { useSocket } from "@/lib/hooks/useSocket";

const NotificationDropdown = ({ isOpen, onClose, triggerRef }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const { on, off } = useSocket();

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

  const { x, y, refs, strategy, update } = useFloating({
    placement: "bottom-end",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 16 }),
      size({
        padding: 16,
        apply({ availableWidth, availableHeight, elements }) {
          const width = Math.min(384, availableWidth);
          const height = Math.min(600, availableHeight);
          Object.assign(elements.floating.style, {
            width: `${width}px`,
            maxHeight: `${height}px`,
          });
        },
      }),
    ],
  });

  useEffect(() => {
    if (triggerRef?.current) {
      refs.setReference(triggerRef.current);
    }
  }, [triggerRef, refs]);

  useEffect(() => {
    if (isOpen) update?.();
  }, [isOpen, notifications?.length, isLoading, update]);

  // ✅ UPDATED: Use global socket service
  useEffect(() => {
    const handleNotification = () => refetch();

    on("notification:new", handleNotification);

    return () => {
      off("notification:new", handleNotification);
    };
  }, [on, off, refetch]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

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
    <FloatingPortal>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-25" />

        {/* Panel */}
        <div
          ref={(node) => {
            dropdownRef.current = node;
            refs.setFloating(node);
          }}
          className="absolute bg-white dark:bg-[#1E1E1E] border dark:border-[#545460] rounded-lg shadow-lg overflow-hidden flex flex-col"
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b dark:border-[#545460] flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <button
              onClick={handleDeleteAll}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Clear All
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No notifications
                </p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2A2A] relative group"
                    onMouseEnter={() => setHoveredId(notification.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex-shrink-0 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {notification.sender_name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {notification?.text ||
                          notification?.notification_event?.text ||
                          "No message"}
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {format(new Date(notification?.created_at), "PPp")}
                      </span>
                    </div>

                    {hoveredId === notification.id && (
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Always visible */}
          <div className="p-4 border-t dark:border-[#545460] flex-shrink-0">
            <button
              onClick={handleViewAll}
              className="w-full bg-[#070707] dark:bg-[#F3F6FE] text-white dark:text-[#070707] py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition font-medium"
            >
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default NotificationDropdown;
