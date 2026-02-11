import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import { LogOut, User, Sparkles, ShieldCheck } from "lucide-react"; 
import { setUsers, setMessages, setSelectedConversation } from "../../redux/slices/chatSlice.js";
import { disconnectSocket } from "../../socket/socketClient.js";

const Navbar = () => {
    const { authUser, onlineUsers } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const isOnline = onlineUsers.includes(authUser?._id);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, { withCredentials: true });
            if (res.data.success) {
                disconnectSocket();
                dispatch(setAuthUser(null));
                dispatch(setUsers([]));
                dispatch(setMessages([]));
                dispatch(setSelectedConversation(null));
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <nav className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 sm:px-12 fixed top-0 w-full z-50 flex items-center justify-between shadow-sm">
            
            {/* Unique App Name: AURA */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                    <div className="bg-gradient-to-tr from-[#0EA5E9] to-[#FBBF24] p-2 rounded-xl rotate-3 transition-transform group-hover:rotate-0">
                        <Sparkles size={22} className="text-white" />
                    </div>
                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 bg-[#FBBF24]/20 blur-lg rounded-full -z-10 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black leading-none tracking-tighter text-gray-900 uppercase">
                        AU<span className="text-[#0EA5E9]">RA</span>
                    </span>
                    <span className="text-[8px] font-bold text-[#FBBF24] tracking-[0.3em] uppercase ml-0.5">
                        Private Chat
                    </span>
                </div>
            </Link>

            <div className="flex items-center gap-6">
                {authUser ? (
                    <div className="flex items-center gap-4">
                        {/* Status Chip */}
                        <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-300"}`}></div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                {isOnline ? "Connected" : "Standby"}
                            </span>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="relative transition-transform active:scale-90">
                                <div className="w-10 h-10 rounded-xl border-2 border-[#FBBF24]/30 overflow-hidden shadow-md">
                                    <img src={authUser.profilePic} alt="profile" className="object-cover w-full h-full" />
                                </div>
                                {isOnline && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                            
                            <ul tabIndex={0} className="mt-4 p-2 shadow-2xl menu dropdown-content bg-white border border-gray-100 rounded-2xl w-64 text-gray-700 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-4 mb-2 bg-gray-50/50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 p-1 flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="text-[#0EA5E9]" size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-gray-900 truncate">{authUser.fullName}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                            Verified Account
                                        </p>
                                    </div>
                                </div>
                                
                                <li className="px-1">
                                    <Link to="/profile" className="flex items-center gap-3 py-3 px-4 hover:bg-[#0EA5E9]/5 hover:text-[#0EA5E9] font-bold rounded-xl transition-all">
                                        <User size={18} /> Profile
                                    </Link>
                                </li>

                                <div className="h-[1px] bg-gray-100 my-2 mx-2" />
                                
                                <li className="px-1">
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 py-3 px-4 text-red-500 hover:bg-red-50 font-bold rounded-xl transition-all"
                                    >
                                        <LogOut size={18} /> Logout Session
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-xs font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-[#0EA5E9] text-white text-[10px] font-black px-6 py-2.5 rounded-xl uppercase tracking-widest shadow-lg shadow-sky-100 hover:bg-[#0284C7] active:scale-95 transition-all">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;