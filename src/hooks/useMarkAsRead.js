import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUnreadCount } from "../redux/slices/chatSlice.js";

const useMarkAsRead = () => {
    const dispatch = useDispatch();
    const { selectedConversation, users } = useSelector((store) => store.chat);

    useEffect(() => {
        const markMessages = async () => {
            if (!selectedConversation?._id) return;
            const currentUser = users.find(u => u._id === selectedConversation._id);
            if (!currentUser || currentUser.unreadCount === 0) return;

            try {
                dispatch(clearUnreadCount(selectedConversation._id));

                await axios.patch(
                    `http://localhost:8080/api/v1/markasread/${selectedConversation._id}`, 
                    {}, 
                    { withCredentials: true }
                );
            } catch (error) {
                console.error("Error marking messages as read:", error);
            }
        };

        markMessages();
    }, [selectedConversation?._id, dispatch]); // Jab bhi user badle, ye trigger hoga
};

export default useMarkAsRead;