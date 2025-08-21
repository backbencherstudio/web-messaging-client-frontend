import { io } from "socket.io-client";

// Use a global ref so Fast Refresh/HMR doesn't create multiple instances
const globalRef = typeof globalThis !== "undefined" ? globalThis : window;
let socketInstance = globalRef.__socketService || null;

class SocketService {
	constructor() {
		if (socketInstance) {
			return socketInstance;
		}

		socketInstance = this;
		globalRef.__socketService = this;

		this.socket = null;
		this.isConnected = false;
		this.isConnecting = false;
		this.eventListeners = new Map();
		this.connectionPromise = null;
		this.listenersAttached = false;

		this.connect = this.connect.bind(this);
		this.disconnect = this.disconnect.bind(this);
		this.on = this.on.bind(this);
		this.off = this.off.bind(this);
		this.emit = this.emit.bind(this);
		this.getInstanceInfo = this.getInstanceInfo.bind(this);
	}

	connect() {
		console.log("SocketService.connect() called, current state:", {
			isConnected: this.isConnected,
			isConnecting: this.isConnecting,
			hasSocket: !!this.socket,
		});

		// Prevent parallel connects
		if (this.isConnecting) {
			return this.connectionPromise;
		}

		const token = this.getToken();
		if (!token) {
			return Promise.reject(new Error("No token available"));
		}

		// If a socket already exists, reuse it (do NOT create a new one)
		if (this.socket) {
			if (this.socket.connected) {
				this.isConnected = true;
				return Promise.resolve();
			}
			// Reconnect existing socket
			this.isConnecting = true;
			this.setupEventListeners();
			this.socket.connect();

			this.connectionPromise = new Promise((resolve, reject) => {
				const timeout = setTimeout(() => reject(new Error("Socket reconnect timeout")), 10000);
				const onConnect = () => {
					clearTimeout(timeout);
					this.isConnected = true;
					this.isConnecting = false;
					this.emit("socket:connected");
					this.socket.off("connect", onConnect);
					this.socket.off("connect_error", onError);
					resolve();
				};
				const onError = (err) => {
					clearTimeout(timeout);
					this.isConnected = false;
					this.isConnecting = false;
					this.socket.off("connect", onConnect);
					this.socket.off("connect_error", onError);
					reject(err);
				};
				this.socket.on("connect", onConnect);
				this.socket.on("connect_error", onError);
			});
			return this.connectionPromise;
		}

		// Create a new socket for the first time
		this.isConnecting = true;
		this.connectionPromise = this._establishConnection();
		return this.connectionPromise;
	}

	// Safe token getter to avoid SSR access
	getToken() {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("token");
	}

	async _establishConnection() {
		try {
			const token = this.getToken();
			const socketUrl =
				process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000";

			console.log("Creating socket connection to:", socketUrl);

			this.socket = io(socketUrl, {
				autoConnect: true,
				reconnection: true,
				reconnectionAttempts: 5,
				reconnectionDelay: 1000,
				auth: { token },
			});

			this.setupEventListeners();

			return new Promise((resolve, reject) => {
				const timeout = setTimeout(() => reject(new Error("Socket connection timeout")), 10000);

				this.socket.on("connect", () => {
					clearTimeout(timeout);
					console.log("Socket connected successfully");
					this.isConnected = true;
					this.isConnecting = false;
					this.emit("socket:connected");
					resolve();
				});

				this.socket.on("connect_error", (error) => {
					clearTimeout(timeout);
					console.error("Socket connection error:", error);
					// IMPORTANT: Do NOT null/replace the socket here.
					// Let the same socket auto-reconnect to avoid duplicates.
					this.isConnected = false;
					this.isConnecting = false;
					reject(error);
				});
			});
		} catch (error) {
			this.isConnecting = false;
			throw error;
		}
	}

	disconnect() {
		console.log("SocketService.disconnect() called");
		console.log("Current state before disconnect:", {
			isConnected: this.isConnected,
			isConnecting: this.isConnecting,
			hasSocket: !!this.socket,
			socketConnected: this.socket?.connected,
		});

		// Clear event bus listeners
		this.eventListeners.clear();

		// Detach raw socket listeners and disconnect
		if (this.socket) {
			try {
				this.socket.off("connect");
				this.socket.off("disconnect");
				this.socket.off("connect_error");
				this.socket.off("reconnect_error");
				this.socket.off("notification");
				this.socket.off("minimum-bid-updated");
			} catch (_) {}
			console.log("Disconnecting socket...");
			this.socket.disconnect();
			this.socket = null;
		}

		// Reset state
		this.isConnected = false;
		this.isConnecting = false;
		this.connectionPromise = null;
		this.listenersAttached = false;

		console.log("Socket disconnected successfully");
	}

	setupEventListeners() {
		if (!this.socket) return;
		if (this.listenersAttached) return; // Avoid duplicates on HMR
		this.listenersAttached = true;

		console.log("Setting up socket event listeners");

		this.socket.on("disconnect", (reason) => {
			console.log("Socket disconnected, reason:", reason);
			this.isConnected = false;
			this.emit("socket:disconnected");
		});

		this.socket.on("connect_error", (err) => {
			console.log("Socket connect_error:", err?.message || err);
			// Do not replace the socket. Let auto-reconnect handle it.
			this.isConnected = false;
			this.isConnecting = false;
		});

		this.socket.on("reconnect_error", (err) => {
			console.log("Socket reconnect_error:", err?.message || err);
			this.isConnected = false;
		});

		this.socket.on("notification", (data) => {
			this.emit("notification:new", data);
		});

		this.socket.on("minimum-bid-updated", (data) => {
			this.emit("payment:bid-updated", data);
		});
	}

	on(event, callback) {
		if (!this.eventListeners.has(event)) {
			this.eventListeners.set(event, []);
		}
		this.eventListeners.get(event).push(callback);
	}

	off(event, callback) {
		if (this.eventListeners.has(event)) {
			const listeners = this.eventListeners.get(event);
			const index = listeners.indexOf(callback);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		}
	}

	emit(event, data) {
		if (this.eventListeners.has(event)) {
			this.eventListeners.get(event).forEach((callback) => callback(data));
		}
	}

	getSocket() {
		return this.socket;
	}

	getConnectionStatus() {
		return this.isConnected && this.socket?.connected;
	}

	forceCleanup() {
		console.log("Force cleanup called");
		this.disconnect();
		socketInstance = null;
		delete globalRef.__socketService;
	}

	getInstanceInfo() {
		return {
			instanceId: this === socketInstance ? "SINGLETON" : "DUPLICATE",
			isConnected: this.isConnected,
			isConnecting: this.isConnecting,
			hasSocket: !!this.socket,
			socketConnected: this.socket?.connected,
			eventListenersCount: this.eventListeners.size,
		};
	}
}

// Export a single, HMR-stable instance
export const socketService = socketInstance || new SocketService();