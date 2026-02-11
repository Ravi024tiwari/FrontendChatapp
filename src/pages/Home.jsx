import Sidebar from "../components/common/SideBar.jsx";
import ChatContainer from "../components/common/ChatContainer";
import useListenMessages from "../hooks/useListenMessage.js";
import { useSelector } from "react-redux";

const Home = () => {
    useListenMessages();
    
    // Redux se check karo ki koi conversation selected hai ya nahi
    const { selectedConversation } = useSelector((store) => store.chat);

    return (
        /* Background: Ultra Light Blue Tint */
        <div className="h-[calc(100vh-64px)] bg-[#F0F9FF] flex p-2 sm:p-5 gap-4 overflow-hidden">
            
            {/* SIDEBAR SECTION 
                - Mobile: Agar conversation selected hai toh 'hidden' (chupa do), warna 'flex' (dikhao)
                - Desktop (sm+): Humesha 'flex' aur fixed width (380px)
            */}
            <aside className={`
                ${selectedConversation ? "hidden" : "flex"} 
                sm:flex flex-col w-full sm:w-87.5 md:w-95 shrink-0 
                bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300
            `}>
                <Sidebar />
            </aside>

            {/* CHAT CONTAINER SECTION 
                - Mobile: Agar conversation selected NAHI hai toh 'hidden', warna 'flex'
                - Desktop (sm+): Humesha 'flex' aur flex-1 (full bachi hui space)
            */}
            <main className={`
                ${!selectedConversation ? "hidden" : "flex"} 
                sm:flex flex-1 flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 min-w-0 overflow-hidden relative
            `}>
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 blur-[80px] rounded-full pointer-events-none"></div>
                
                <ChatContainer />
            </main>
        </div>
    );
};

export default Home;