import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { Phone, Video, X, MessageSquare, ChevronLeft } from "lucide-react";
import { setSelectedConversation } from "../../redux/slices/chatSlice.js";
import useMarkAsRead from "../../hooks/useMarkAsRead.js";

const ChatContainer = () => {
    const dispatch = useDispatch();
    const { selectedConversation } = useSelector((store) => store.chat);
    const { onlineUsers } = useSelector((store) => store.auth); 
    
    useMarkAsRead();

    const isOnline = onlineUsers.includes(selectedConversation?._id);

    if (!selectedConversation) return <NoChatSelected />;

    return (
        <div className="flex flex-col h-full bg-white transition-all duration-300">
            
            {/* --- PROFESSIONAL HEADER (White Glassmorphism) --- */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    {/* Back Button for Mobile View */}
                    <button 
                        onClick={() => dispatch(setSelectedConversation(null))}
                        className="md:hidden p-2 -ml-2 text-gray-400 hover:text-[#1D4ED8] transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Avatar with Squircle Style */}
                    <div className="relative group cursor-pointer">
                        <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-[#FBBF24]">
                            <img 
                                src={selectedConversation.profilePic} 
                                alt="profile" 
                                className="w-10 h-10 rounded-[0.9rem] object-cover border-2 border-white group-hover:scale-105 transition-transform"
                            />
                        </div>
                        {isOnline && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                        )}
                    </div>

                    <div>
                        <h3 className="font-black text-[#1D4ED8] text-sm sm:text-base leading-tight">
                            {selectedConversation.fullName}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${isOnline ? "text-green-500" : "text-gray-300"}`}>
                                {isOnline ? "Active Now" : "Currently Away"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interaction Icons: Golden & Blue Accents */}
                <div className="flex items-center gap-1 sm:gap-2">
                   
                    <div className="w-[1px] h-6 bg-gray-100 mx-2"></div>
                    <button 
                        onClick={() => dispatch(setSelectedConversation(null))}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>
            </header>

            {/* --- MESSAGES AREA --- */}
            <main className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <Messages />
            </main>

            {/* --- INPUT AREA --- */}
            <footer className="bg-white">
                <MessageInput key={selectedConversation._id} />
            </footer>
        </div>
    );
};

const NoChatSelected = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-white relative overflow-hidden">
            {/* Background Aesthetic Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1D4ED8]/5 blur-[100px] rounded-full"></div>
            
            <div className="text-center flex flex-col items-center max-w-sm px-6 relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                    <MessageSquare size={32} className="text-[#FBBF24] animate-bounce" />
                </div>
                <h2 className="text-2xl font-black text-[#1D4ED8] mb-3 tracking-tight uppercase">
                    Your Messages
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">
                    Select a conversation from the sidebar to start chatting.
                </p>
                
                <div className="mt-8 px-6 py-2 bg-blue-50 rounded-full border border-blue-100">
                    <p className="text-[9px] text-[#1D4ED8] font-black uppercase tracking-[0.2em]">
                        🔒 End-to-End Encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;