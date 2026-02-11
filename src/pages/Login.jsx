import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slices/authSlice.js";
import { connectSocket } from "../socket/socketClient.js";
import { MessageSquare, Lock, User, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/v1/login", input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                connectSocket(res.data.data._id);
                toast.success(res.data.message);
                dispatch(setAuthUser(res.data.data));
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Background: Ultra Light Sky Blue Gradient */
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* Background Decorative Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#0EA5E9]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#FBBF24]/10 blur-[120px] rounded-full"></div>

            {/* Login Card */}
            <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_-15px_rgba(14,165,233,0.1)] border border-blue-50 z-10 animate-in fade-in zoom-in duration-500">
                
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#0EA5E9] rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100 mb-6">
                        <MessageSquare size={32} className="text-[#FBBF24]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#0EA5E9] tracking-tight">Welcome</h2>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] mt-3">
                        Sign in to GoldenChat
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Enter your username"
                                className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-50 transition-all duration-300 placeholder:text-gray-300 text-sm"
                                value={input.username} 
                                onChange={(e) => setInput({...input, username: e.target.value})} 
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field - Forgot link removed */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors">
                                <Lock size={18} />
                            </div>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 text-gray-700 font-semibold rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-50 transition-all duration-300 placeholder:text-gray-300 text-sm"
                                value={input.password} 
                                onChange={(e) => setInput({...input, password: e.target.value})} 
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button: Sky Blue Theme */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-100 active:scale-[0.98] group mt-4 uppercase tracking-widest text-xs"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Get Started
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Don't have an account? 
                            <Link to="/signup" className="text-[#0EA5E9] hover:text-[#0284C7] ml-2 underline decoration-2 underline-offset-4 transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;