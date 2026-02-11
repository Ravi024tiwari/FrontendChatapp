import { useState } from "react";
import { Send, Loader2, ImagePlus } from "lucide-react"; 
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/slices/chatSlice.js";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || loading) return;

        setLoading(true);
        try {
            const res = await axios.post(
                `http://localhost:8080/api/v1/send/${selectedConversation._id}`,
                { message },
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.data]));
                setMessage("");
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="px-3 sm:px-6 py-4 bg-white border-t border-gray-100" onSubmit={handleSubmit}>
            <div className="max-w-5xl mx-auto w-full flex items-center gap-2 sm:gap-4">
                
                {/* Optional: Image Upload Icon for better UX */}
                <button type="button" className="hidden sm:flex p-2 text-gray-400 hover:text-[#1D4ED8] transition-colors">
                    <ImagePlus size={22} />
                </button>

                {/* Input Area with High Visibility Border */}
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        className="w-full bg-gray-50 text-gray-800 text-sm font-medium rounded-2xl py-3.5 px-5 
                                   outline-none border border-gray-200 
                                   focus:border-[#1D4ED8] focus:bg-white focus:ring-4 focus:ring-blue-50 
                                   transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                        placeholder={`Message @${selectedConversation?.fullName}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                    />
                </div>
                
                {/* Send Button: Proportioned for Mobile/Desktop */}
                <button 
                    type="submit" 
                    disabled={!message.trim() || loading}
                    className={`h-11 w-11 sm:h-12 sm:w-12 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-md
                        ${!message.trim() || loading 
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none" 
                            : "bg-[#1D4ED8] text-[#FBBF24] hover:bg-[#1e40af] hover:shadow-blue-200 active:scale-95"}`}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send size={18} className={`sm:w-5 sm:h-5 ${message.trim() ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
                    )}
                </button>
            </div>
            
            <p className="hidden sm:block text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mt-3">
                Secure GoldenChat Protocol
            </p>
        </form>
    );
};

export default MessageInput;