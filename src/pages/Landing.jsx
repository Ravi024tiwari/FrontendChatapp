import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Shield, Zap, Sparkles, ArrowRight, Star } from "lucide-react";

const Landing = () => {
    return (
        <div className="min-h-screen bg-white overflow-x-hidden selection:bg-[#0EA5E9]/10">
            {/* --- ANIMATED BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div 
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#0EA5E9]/5 blur-[120px] rounded-full"
                />
                <motion.div 
                    animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#FBBF24]/10 blur-[120px] rounded-full"
                />
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 sm:pt-32 pb-20 flex flex-col items-center text-center">
                
                {/* 1. TOP BADGE */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8 cursor-default"
                >
                    <Sparkles size={14} className="text-[#FBBF24] animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#0EA5E9]">
                        Elite Messaging for the Modern Era
                    </span>
                </motion.div>

                {/* 2. HERO TITLE */}
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 tracking-tight mb-8 leading-[1.1]"
                >
                    Chat with <br className="hidden sm:block" />
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#FBBF24]">
                            Pure Aura.
                        </span>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 1 }}
                            className="absolute -bottom-2 left-0 h-1 bg-[#FBBF24]/30 rounded-full"
                        />
                    </span>
                </motion.h1>

                {/* 3. DESCRIPTION */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="max-w-[320px] sm:max-w-2xl text-gray-400 text-sm sm:text-xl font-medium mb-12 leading-relaxed"
                >
                    AURA combines high-speed connectivity with a golden standard of privacy. Designed for those who seek elegance in every message.
                </motion.p>

                {/* 4. CTA BUTTONS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                >
                    <Link to="/signup" className="w-full sm:w-auto group bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95">
                        Start Your Aura
                        <ArrowRight size={18} className="text-[#FBBF24] group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-500 hover:text-[#0EA5E9] transition-all border border-transparent hover:bg-white hover:border-gray-100">
                        Sign In
                    </Link>
                </motion.div>

                {/* 5. FEATURE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-24 sm:mt-40 w-full">
                    <FeatureCard 
                        delay={0.8}
                        icon={<Shield size={24} className="text-[#0EA5E9]" />} 
                        title="Quantum Secure" 
                        desc="Advanced encryption protocols keeping your private data invisible." 
                    />
                    <FeatureCard 
                        delay={1.0}
                        icon={<Zap size={24} className="text-[#FBBF24]" />} 
                        title="Real-time Flow" 
                        desc="Experience zero-latency chatting with our optimized aura engine." 
                    />
                    <FeatureCard 
                        delay={1.2}
                        icon={<Star size={24} className="text-[#0EA5E9]" />} 
                        title="Premium UX" 
                        desc="A stunning interface that feels as good as it looks." 
                    />
                </div>
            </main>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -10 }}
        className="p-8 sm:p-10 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-[#0EA5E9]/5 transition-all text-left group"
    >
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9]/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm font-medium leading-loose">{desc}</p>
    </motion.div>
);

export default Landing;