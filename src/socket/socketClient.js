import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
    if (socket && socket.connected) return socket;
    if (!socket) {
        socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
            query: { userId },
            reconnection: true,
        });
        
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
    }
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("Socket disconnected");
    }
};