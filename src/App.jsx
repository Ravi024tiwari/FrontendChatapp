import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAuthUser, setOnlineUsers } from "./redux/slices/authSlice.js";
import "./index.css";

// Components & Pages
import Navbar from "./components/common/NavBar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProfileView from "./pages/ProfileView.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Landing from "./pages/Landing.jsx";


// Socket Singleton
import { connectSocket, disconnectSocket } from "./socket/socketClient.js";

function App() {
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 1. Session Persistence (checkAuth)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL/me}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAuthUser(res.data.data));
        }
      } catch (error) {
        console.log("Not authenticated");
        dispatch(setAuthUser(null));
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  // 2. Socket Connection & Disconnection Logic
  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id);

      // Listen for online users
      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      // CLEANUP: Jab component unmount ho ya authUser badle (Logout)
      return () => {
        socket.off("getOnlineUsers");
        disconnectSocket(); // Yeh backend connection band kar dega
      };
    } else {
      // Agar authUser null ho jaye (Logout case), toh ensure karein socket band ho
      disconnectSocket();
    }
  }, [authUser]);

  // Loading Screen
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#2F3136]">
        <span className="loading loading-spinner loading-lg text-[#5865F2]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#36393F]">
      <Navbar />
      
      <div className="pt-20 h-[calc(100vh)]"> 
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Landing/>} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfileView /> : <Navigate to="/login" />} />
         <Route path="/profile/update" element={authUser ? <UpdateProfile /> : <Navigate to="/login" />} />
          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;