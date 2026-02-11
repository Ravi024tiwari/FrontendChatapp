import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/chatSlice.js";
import { ChevronRight } from "lucide-react";

const ConversationItem = ({ user, lastIdx }) => {
    const dispatch = useDispatch();
    
    const { users, selectedConversation } = useSelector((store) => store.chat);
    const { onlineUsers } = useSelector((store) => store.auth);
    
    const currentUserData = users.find((u) => u._id === user._id) || user;
    const isOnline = onlineUsers.includes(user._id);
    const isSelected = selectedConversation?._id === user._id;

    return (
        <div className="px-3 w-full group/item">
            <div
                onClick={() => dispatch(setSelectedConversation(currentUserData))}
                /* SELECTED STATE: Deep Blue background with Shadow
                   HOVER STATE: Soft Gray background
                */
                className={`flex gap-3 items-center rounded-[1.5rem] p-3 cursor-pointer transition-all duration-300 relative
                    ${isSelected 
                        ? "bg-[#1D4ED8] shadow-lg shadow-blue-200 scale-[1.02] z-10" 
                        : "hover:bg-gray-50 border border-transparent"}`}
            >
                {/* Avatar Section */}
                <div className="relative flex-shrink-0">
                    <div className={`p-0.5 rounded-[1.1rem] transition-all duration-300 
                        ${isSelected ? "bg-white/20" : "bg-transparent group-hover/item:bg-gray-200"}`}>
                        <img 
                            src={currentUserData.profilePic} 
                            alt="avatar" 
                            className={`w-12 h-12 rounded-[1rem] object-cover border-2 transition-all
                                ${isSelected ? "border-[#FBBF24]" : "border-white shadow-sm"}`} 
                        />
                    </div>
                    
                    {/* Online Indicator */}
                    {isOnline && (
                        <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 border-[3px] rounded-full shadow-sm
                            ${isSelected ? "bg-[#FBBF24] border-[#1D4ED8]" : "bg-green-500 border-white"}`}>
                        </span>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-1">
                        <p className={`text-sm font-black truncate transition-colors
                            ${isSelected ? "text-white" : "text-gray-700 group-hover/item:text-[#1D4ED8]"}`}>
                            {currentUserData.fullName}
                        </p>
                        
                        {/* Unread Badge: White when selected, Gold when not */}
                        {currentUserData.unreadCount > 0 && !isSelected && (
                            <span className="flex-shrink-0 bg-[#FBBF24] text-[#1D4ED8] text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                                {currentUserData.unreadCount}
                            </span>
                        )}

                        {isSelected && <ChevronRight size={16} className="text-white/70 animate-pulse" />}
                    </div>
                    
                    <div className="flex items-center justify-between mt-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                            ${isSelected ? "text-blue-100" : (isOnline ? "text-green-500" : "text-gray-300")}`}>
                            {isOnline ? "Active" : "Offline"}
                        </span>
                        
                        {/* Selected Indicator Light */}
                        {isSelected && <div className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full shadow-[0_0_8px_#FBBF24]"></div>}
                    </div>
                </div>
            </div>

            {/* Divider: Hidden when selected for clean look */}
            {!lastIdx && !isSelected && (
                <div className="h-[1px] bg-gray-50 mx-6 mt-1 opacity-60" />
            )}
        </div>
    );
};

export default ConversationItem;