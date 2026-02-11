import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../redux/slices/chatSlice.js";
import Message from "./Message";
import { MessageCircle } from "lucide-react";

const Messages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages } = useSelector((store) => store.chat);
    const dispatch = useDispatch();
    
    const lastMessageRef = useRef();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) return;
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${selectedConversation._id}/getHistory`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setMessages(res.data.data));
                }
            } catch (error) {
                console.error("Error fetching messages:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    return (
        /* Container: Pure White background with smooth scrolling */
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-white custom-scrollbar space-y-4">
            
            {/* Loading State: Bright Skeletons with Blueish tint */}
            {loading && (
                <div className="flex flex-col gap-6">
                    {[...Array(5)].map((_, idx) => (
                        <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                            <div className="flex flex-col gap-2">
                                <div className={`h-12 w-48 sm:w-64 rounded-2xl animate-pulse border border-gray-100 
                                    ${idx % 2 === 0 ? "bg-gray-100" : "bg-blue-50"}`}>
                                </div>
                                <div className={`h-3 w-12 rounded-full animate-pulse bg-gray-50 
                                    ${idx % 2 === 0 ? "self-start" : "self-end"}`}>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Messages List */}
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Message message={message} />
                </div>
            ))}

            {/* Empty State: Golden-Blue Aesthetic */}
            {!loading && messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in zoom-in duration-500">
                    <div className="relative">
                        <div className="p-6 bg-gray-50 rounded-full border border-gray-100 shadow-inner">
                            <img 
                                src={selectedConversation?.profilePic} 
                                className="w-20 h-20 rounded-full object-cover grayscale opacity-60" 
                                alt="Start chat"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-50">
                            <MessageCircle className="text-[#FBBF24]" size={24} />
                        </div>
                    </div>
                    
                    <div className="text-center max-w-[260px] space-y-1">
                        <p className="text-[#1D4ED8] font-black uppercase tracking-widest text-[10px]">
                            New Conversation
                        </p>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed">
                            This is the beginning of your history with <span className="text-[#1D4ED8] font-bold">@{selectedConversation?.fullName}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;