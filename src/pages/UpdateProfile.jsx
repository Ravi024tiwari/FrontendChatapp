import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Camera, User, Save, X, Loader2, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../redux/slices/authSlice";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
    const { authUser } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState(authUser?.fullName || "");
    const [previewImg, setPreviewImg] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData();
        formData.append("fullName", fullName);
        if (imageFile) formData.append("profilePic", imageFile);

        try {
            const res = await axios.put("http://localhost:8080/api/v1/update/profile", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.data));
                toast.success("Profile Synchronized!");
                navigate("/profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        /* Background: Light Sky Blue Gradient */
        <div className="min-h-screen pt-24 bg-[#F0F9FF] flex justify-center px-4 relative overflow-hidden">
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#0EA5E9]/5 blur-[120px] rounded-full"></div>

            <div className="max-w-[420px] w-full z-10">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(14,165,233,0.05)] border border-gray-100">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                            <h2 className="text-sm font-black text-[#0EA5E9] uppercase tracking-[0.2em]">Edit Profile</h2>
                            <div className="h-1 w-6 bg-[#FBBF24] rounded-full mt-1"></div>
                        </div>
                        <button 
                            onClick={() => navigate("/profile")} 
                            className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 shadow-sm"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-8">
                        
                        {/* Avatar Picker Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="p-1 rounded-[2.2rem] bg-gradient-to-tr from-[#0EA5E9] to-[#FBBF24] shadow-xl">
                                    <img 
                                        src={previewImg || authUser?.profilePic} 
                                        className="w-28 h-28 rounded-[2rem] object-cover border-4 border-white transition-all group-hover:opacity-90"
                                        alt="Profile Preview"
                                    />
                                </div>
                                <label className="absolute -bottom-2 -right-2 bg-[#0EA5E9] hover:bg-[#0284C7] p-3 rounded-2xl cursor-pointer shadow-2xl transition-all active:scale-90 border-4 border-white group-hover:rotate-6">
                                    <Camera size={20} className="text-white" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                <ImagePlus size={12} className="text-[#FBBF24]" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Avatar</span>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Display Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#0EA5E9] transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input 
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-50 transition-all duration-300 shadow-sm"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button 
                            type="submit" 
                            disabled={isUpdating}
                            className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white text-[10px] font-black py-5 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-gray-200 active:scale-95 uppercase tracking-[0.25em]"
                        >
                            {isUpdating ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Save size={18} className="text-[#FBBF24]" />
                            )}
                            {isUpdating ? "Processing..." : "Commit Changes"}
                        </button>
                    </form>
                </div>

                {/* Secure Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                        Metadata Encryption Enabled
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;