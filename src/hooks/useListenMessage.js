import { useEffect } from "react";
import { getSocket } from "../socket/socketClient"; // Singleton instance
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setUsers } from "../redux/slices/chatSlice";
import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
    const dispatch = useDispatch();
    const { messages, selectedConversation, users } = useSelector((store) => store.chat);

    useEffect(() => {
        // Variable ko yahan define kiya gaya hai
        console.log("Current Messages in Hook:", messages.length);
        const socketInstance = getSocket(); 
        
        if (!socketInstance) return;

        const handleNewMessage = (newMessage) => {
            console.log("DEBUG: Socket se message aaya ->", newMessage);
            const sound = new Audio(notificationSound);
            sound.play().catch(() => {});

            if (selectedConversation?._id === newMessage.senderId) {
                dispatch(setMessages([...messages, newMessage]));
            } else {
                const updatedUsers = users.map((user) => {
                    if (user._id === newMessage.senderId) {
                        return { ...user, unreadCount: (user.unreadCount || 0) + 1 };
                    }
                    return user;
                });
                dispatch(setUsers(updatedUsers));
            }
        };

        const handleMessagesRead = ({ readerId }) => {
            if (selectedConversation?._id === readerId) {
                const updatedMessages = messages.map((msg) => {
                    if (msg.receiverId === readerId) {
                        return { ...msg, isRead: true };
                    }
                    return msg;
                });
                dispatch(setMessages(updatedMessages));
            }
        };

        // socketInstance use karein, 'socket' nahi
        socketInstance.on("newMessage", handleNewMessage);
        socketInstance.on("messagesRead", handleMessagesRead);

        return () => {
            socketInstance.off("newMessage", handleNewMessage);
            socketInstance.off("messagesRead", handleMessagesRead);
        };

    // Yahan 'socket' ko hata kar variables ko correct kiya gaya hai
    }, [messages, selectedConversation, users, dispatch]); 
};

export default useListenMessages;