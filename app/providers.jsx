"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect, useState } from "react";
import { socketService } from "@/lib/socketService";
import { baseApi } from "./store/api/baseApi";
import { notificationApi } from "./store/api/notificationApi";

export function Providers({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    console.log("Providers mounted");
    console.log(
      "SocketService instance info:",
      socketService.getInstanceInfo?.()
    );

    // HMR-safe init: prevent double connect in Strict Mode / Fast Refresh
    if (!globalThis.__socketInitDone) {
      globalThis.__socketInitDone = true;

      const token = localStorage.getItem("token");
      if (token) {
        console.log("Token found, initializing socket connection...");
        socketService.connect().catch((error) => {
          console.error("Failed to connect socket:", error);
        });
      } else {
        console.log("No token found, skipping socket connection");
      }
    }

    // Invalidate notifications on socket events so all subscribers update
    const invalidateNotifications = (payload) => {
      // Optimistically bump the badge count for the shared cache key
      try {
        store.dispatch(
          notificationApi.util.updateQueryData(
            "getNotifications",
            { page: 1, limit: 5 },
            (draft) => {
              const pagination = draft?.data?.pagination;
              if (pagination && typeof pagination.total_items === "number") {
                pagination.total_items += 1;
              }
            }
          )
        );
      } catch (_) {}

      // Small delay to avoid races where backend hasn't persisted yet
      setTimeout(() => {
        store.dispatch(baseApi.util.invalidateTags(["Notifications"]));
      }, 250);
    };
    socketService.on("notification:new", invalidateNotifications);

    return () => {
      console.log("Providers unmounting, disconnecting socket...");
      socketService.off("notification:new", invalidateNotifications);
      socketService.disconnect();
      globalThis.__socketInitDone = false;
    };
  }, [isClient]);

  return <Provider store={store}>{children}</Provider>;
}
