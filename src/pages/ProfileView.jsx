import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, Calendar, ShieldCheck, Edit3, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";

const ProfileView = () => {
    const { authUser } = useSelector((store) => store.auth);

    return (
        /* Background: Ultra-clean Sky Blue tint */
        <div className="min-h-screen pt-24 pb-12 bg-[#F0F9FF] flex justify-center px-4 relative overflow-hidden">
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBBF24]/10 blur-[120px] rounded-full -z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0EA5E9]/10 blur-[120px] rounded-full -z-0"></div>

            <div className="max-w-[420px] w-full z-10">
                
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <Link to="/" className="p-3 bg-white rounded-2xl text-gray-400 hover:text-[#0EA5E9] shadow-sm border border-gray-100 transition-all hover:scale-105">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex flex-col items-center">
                        <h1 className="text-sm font-black text-gray-900 uppercase tracking-[0.3em]">Profile</h1>
                        <div className="h-1 w-4 bg-[#FBBF24] rounded-full mt-1"></div>
                    </div>
                    <Link to="/profile/update" className="p-3 bg-[#0EA5E9]/10 rounded-2xl text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-sm border border-[#0EA5E9]/20">
                        <Edit3 size={20} />
                    </Link>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(14,165,233,0.05)] relative">
                    <div className="flex flex-col items-center">
                        
                        {/* Avatar Section: Squircle Style with Aura Gradient */}
                        <div className="relative mb-6">
                            <div className="p-1.5 rounded-[2.5rem] bg-gradient-to-tr from-[#0EA5E9] to-[#FBBF24] shadow-xl shadow-sky-100">
                                <img 
                                    src={authUser?.profilePic} 
                                    className="w-28 h-28 rounded-[2.2rem] object-cover border-4 border-white" 
                                    alt="Profile"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md">
                                <div className="w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </div>

                        {/* Identity */}
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{authUser?.fullName}</h2>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                                    @{authUser?.username}
                                </span>
                            </div>
                        </div>

                        {/* Information Items */}
                        <div className="w-full space-y-4">
                            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] ml-4 mb-2">Member Details</h3>
                            
                            {/* Email */}
                            <div className="group bg-gray-50/50 hover:bg-white flex items-center justify-between p-4 rounded-[1.8rem] border border-gray-100 transition-all hover:shadow-md hover:border-[#0EA5E9]/20">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl text-[#0EA5E9] shadow-sm group-hover:bg-[#0EA5E9] group-hover:text-white transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">Official Email</span>
                                        <span className="text-sm text-gray-700 font-bold">{authUser?.username}@aura.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Joined Date */}
                            <div className="group bg-gray-50/50 hover:bg-white flex items-center justify-between p-4 rounded-[1.8rem] border border-gray-100 transition-all hover:shadow-md hover:border-[#FBBF24]/20">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl text-[#FBBF24] shadow-sm group-hover:bg-[#FBBF24] group-hover:text-white transition-all">
                                        <Calendar size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">Member Since</span>
                                        <span className="text-sm text-gray-700 font-bold">{authUser?.createdAt?.split("T")[0]}</span>
                                    </div>
                                </div>
                                <div className="mr-2">
                                    <Sparkles size={16} className="text-[#FBBF24]" />
                                </div>
                            </div>
                        </div>

                        {/* Verification Action */}
                        <div className="w-full mt-8 pt-8 border-t border-gray-50">
                            <button className="w-full flex items-center justify-between p-4 bg-gray-900 rounded-[1.8rem] transition-all hover:scale-[1.02] shadow-xl shadow-gray-200 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl text-[#FBBF24]">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-black text-xs uppercase tracking-widest">Verify Aura ID</p>
                                        <p className="text-gray-400 text-[9px] font-bold">Trusted Member Protection</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* s Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                        AURA Secure Infrastructure v2.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;