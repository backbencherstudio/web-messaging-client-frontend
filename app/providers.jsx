"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { socketService } from "@/lib/socketService";

export function Providers({ children }) {
  useEffect(() => {
    // Initialize socket service on app boot
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
