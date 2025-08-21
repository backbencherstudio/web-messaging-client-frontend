import { useEffect, useState } from "react";
import { socketService } from "../socketService";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    console.log("useSocket hook mounted");
    console.log(
      "SocketService instance info:",
      socketService.getInstanceInfo()
    );

    const handleConnect = () => {
      console.log("Socket connected in hook");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected in hook");
      setIsConnected(false);
    };

    // Add event listeners
    socketService.on("socket:connected", handleConnect);
    socketService.on("socket:disconnected", handleDisconnect);

    // Set initial state
    const initialStatus = socketService.getConnectionStatus();
    console.log("Initial connection status:", initialStatus);
    setIsConnected(initialStatus);

    return () => {
      console.log("useSocket hook unmounting, removing listeners");
      // Remove event listeners only
      socketService.off("socket:connected", handleConnect);
      socketService.off("socket:disconnected", handleDisconnect);
    };
  }, [isClient]);

  return {
    socket: socketService.getSocket(),
    isConnected,
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
  };
};
