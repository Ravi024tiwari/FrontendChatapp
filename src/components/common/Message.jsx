import { useSelector } from "react-redux";
import { Check, CheckCheck } from "lucide-react";

const Message = ({ message }) => {
    const { authUser } = useSelector((store) => store.auth);
    const { selectedConversation } = useSelector((store) => store.chat);
    const chatState = useSelector((store) => store.chat);
    console.log("Current Chat State for checking of redux:", chatState);
    
    const fromMe = message.senderId === authUser?._id;
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    
    /* Updated Color Palette for Professional Soft Look:
       - Sender (From Me): Light Blue (#EBF5FF) with Blue text
       - Receiver (From Other): Light Orange (#FFF7ED) with Darker Orange/Gray text
    */
    const bubbleStyle = fromMe 
        ? "bg-[#EBF5FF] border border-[#DBEAFE] text-[#1D4ED8] rounded-[1.3rem] rounded-tr-none shadow-sm" 
        : "bg-[#FFF7ED] border border-[#FFEDD5] text-[#9A3412] rounded-[1.3rem] rounded-tl-none shadow-sm";

    return (
        <div className={`flex w-full mb-5 group px-2 ${fromMe ? "justify-end" : "justify-start"}`}>
            
            <div className={`flex max-w-[85%] sm:max-w-[70%] gap-2 ${fromMe ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Minimalist Avatar */}
                <div className="flex-shrink-0 mt-auto pb-1">
                    <img 
                        src={profilePic} 
                        className="w-7 h-7 rounded-xl object-cover border-2 border-white shadow-sm" 
                        alt="pfp" 
                    />
                </div>

                {/* Message & Meta Stack */}
                <div className={`flex flex-col ${fromMe ? "items-end" : "items-start"}`}>
                    
                    {/* The Bubble with Soft Border and Pastel Fill */}
                    <div className={`${bubbleStyle} px-4 py-3 transition-all duration-300 hover:shadow-md`}>
                        <p className="text-[13px] font-semibold leading-relaxed tracking-tight">
                            {message.message}
                        </p>
                    </div>

                    {/* Meta Data: Subtle and Professional */}
                    <div className={`flex items-center gap-1.5 mt-1 px-1`}>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                            {new Date(message.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: true 
                            })}
                        </span>
                        
                        {fromMe && (
                            <div className="flex items-center">
                                {message.isRead ? (
                                    <CheckCheck size={12} className="text-[#FBBF24]" />
                                ) : (
                                    <Check size={12} className="text-gray-300" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;