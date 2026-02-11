import { useState } from "react";
import { Search } from "lucide-react"; 
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/chatSlice";
import { toast } from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { users } = useSelector((store) => store.chat || { users: [] });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }

        const conversation = users.find((u) => u.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            dispatch(setSelectedConversation(conversation));
            setSearch("");
        } else {
            toast.error("No such user found!");
        }
    };

    return (
        /* Padding aur Background white rakha hai sidebar se match karne ke liye */
        <div className="w-full px-2 py-3 bg-white"> 
            <form onSubmit={handleSubmit} className="relative w-full group">
                {/* Search Icon: Golden Yellow color (#FBBF24) transition effect ke saath */}
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search size={16} className="text-[#FBBF24] group-focus-within:text-[#1D4ED8] transition-colors" />
                </div>
                
                <input
                    type="text"
                    placeholder="Search people..."
                    /* Background: Light Gray (#F9FAFB)
                       Text: Deep Blue (#1D4ED8)
                       Focus Border: Blue (#1D4ED8)
                    */
                    className="w-full bg-[#F9FAFB] text-gray-700 font-medium text-xs rounded-2xl py-3 pl-11 pr-4 outline-none border border-gray-100 focus:border-[#1D4ED8]/30 focus:bg-white focus:shadow-sm transition-all placeholder:text-gray-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                {/* Micro-interaction: Ek chota subtle glow effect focus hone par */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none group-focus-within:ring-2 ring-[#1D4ED8]/5 transition-all"></div>
            </form>
        </div>
    );
};

export default SearchInput;