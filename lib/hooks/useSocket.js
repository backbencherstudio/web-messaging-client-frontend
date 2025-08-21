import { useEffect, useState } from "react";
import { socketService } from "../socketService";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.on("socket:connected", handleConnect);
    socketService.on("socket:disconnected", handleDisconnect);

    // Connect if not already connected
    if (!socketService.getConnectionStatus()) {
      socketService.connect();
    } else {
      setIsConnected(true);
    }

    return () => {
      socketService.off("socket:connected", handleConnect);
      socketService.off("socket:disconnected", handleDisconnect);
    };
  }, []);

  return {
    socket: socketService.getSocket(),
    isConnected,
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
  };
};
