import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slices/authSlice.js";
import { MessageSquare, User, Lock, ArrowRight, Loader2, UserCircle } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/v1/register", input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                console.log('The new signup user data:',res.data.data);
                dispatch(setAuthUser(res.data.data));
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Background: Light Sky Blue Gradient */
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            
            {/* Background Decorative Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#0EA5E9]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#FBBF24]/10 blur-[120px] rounded-full"></div>

            {/* Signup Card */}
            <div className="w-full max-w-[500px] bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(14,165,233,0.1)] border border-blue-50 z-10 animate-in fade-in zoom-in duration-500">
                
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-[#0EA5E9] rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100 mb-4">
                        <MessageSquare size={28} className="text-[#FBBF24]" />
                    </div>
                    <h2 className="text-2xl font-black text-[#0EA5E9] tracking-tight uppercase">Create Account</h2>
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.25em] mt-2">
                        Start your journey with GoldenChat
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] transition-all text-sm" 
                                    value={input.fullName} 
                                    onChange={(e) => setInput({...input, fullName: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] transition-all text-sm" 
                                    value={input.username} 
                                    onChange={(e) => setInput({...input, username: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] transition-all text-sm" 
                                    value={input.password} 
                                    onChange={(e) => setInput({...input, password: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] transition-all text-sm" 
                                    value={input.confirmPassword} 
                                    onChange={(e) => setInput({...input, confirmPassword: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gender Selection - Themed */}
                    <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                        <div className="flex gap-4">
                            {['male', 'female'].map((g) => (
                                <label key={g} className="flex-1 relative cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        className="peer hidden"
                                        onChange={() => setInput({...input, gender: g})} 
                                    />
                                    <div className="w-full py-2.5 text-center rounded-xl border border-slate-100 bg-slate-50 text-gray-400 font-bold text-[10px] uppercase tracking-widest transition-all peer-checked:bg-[#0EA5E9] peer-checked:text-white peer-checked:border-[#0EA5E9] peer-checked:shadow-lg peer-checked:shadow-sky-100 group-hover:bg-slate-100">
                                        {g}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-100 active:scale-[0.98] group mt-6 uppercase tracking-widest text-xs"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                Create Account
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest pt-4">
                        Member already? 
                        <Link to="/login" className="text-[#0EA5E9] ml-2 underline decoration-2 underline-offset-4">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;