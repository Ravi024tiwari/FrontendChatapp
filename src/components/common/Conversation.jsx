import { useEffect, useState } from "react";
import axios from "axios";
import ConversationItem from "./ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/chatSlice";
import { Loader2, Users } from "lucide-react";

const Conversations = () => {
    const [loading, setLoading] = useState(false);
    // Local state ki jagah hum Redux se users lenge taki search/updates sync rahein
    const { users } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/api/v1/sidebar/user", {
                    withCredentials: true,
                });
                
                if (res.data.success) {
                    dispatch(setUsers(res.data.data)); 
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, [dispatch]);

    return (
        /* Container: Pure White background jo sidebar ke saath seamless merge hoga */
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-white px-2">
            
            {/* Professional Header Label: Deep Blue (#1D4ED8) */}
            <div className="px-4 mb-4 mt-2">
                <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#FBBF24]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D4ED8]">
                        Direct Messages
                    </p>
                </div>
            </div>

            {/* Users List: Added a small gap for a breathable layout */}
            <div className="space-y-1 pb-4">
                {!loading && users.map((user, idx) => (
                    <div key={user._id} className="animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                        <ConversationItem
                            user={user}
                            lastIdx={idx === users.length - 1}
                        />
                    </div>
                ))}
            </div>

            {/* Loading State: Custom Blue Spinner */}
            {loading && (
                <div className="flex flex-col justify-center items-center py-20 gap-3">
                    <Loader2 className="w-8 h-8 text-[#1D4ED8] animate-spin" />
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        Loading Chats...
                    </p>
                </div>
            )}

            {/* Empty State: Clean and Professional */}
            {!loading && users.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 px-6 text-center space-y-3 opacity-40">
                    <div className="p-4 bg-gray-50 rounded-full">
                        <Users size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-400 text-xs font-medium italic">
                        No active conversations found.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Conversations;