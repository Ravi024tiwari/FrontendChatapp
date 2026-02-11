import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversation.jsx";

const Sidebar = () => {
    return (
        /* Background: Pure White (#FFFFFF)
           Border: Very subtle light gray (#F3F4F6)
           Shadow: Soft right shadow to create depth
        */
        <aside className="w-full sm:w-[320px] md:w-[380px] flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            
            {/* Header / Search Section */}
            <div className="flex-none w-full p-4 bg-white">
                <div className="mb-2">
                    <h2 className="text-sm font-black text-[#1D4ED8] uppercase tracking-[0.2em] ml-2">
                        Messages
                    </h2>
                </div>
                <SearchInput />
            </div>

            {/* Subtle Divider: Matches the bright theme */}
            <div className="h-[1px] bg-gray-50 w-[90%] mx-auto"></div>

            {/* Conversations List Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden bg-white px-2 pt-2">
                <Conversations />
            </div>

            {/* Footer / Info (Optional) */}
            <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    End-to-end encrypted
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;