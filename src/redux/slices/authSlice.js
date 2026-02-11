import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null, // Logged-in user ki details (id, name, profilePic)
        onlineUsers: [],
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOnlineUsers: (state, action) => { // Naya reducer
            state.onlineUsers = action.payload;
        },
    },
});

export const { setAuthUser,setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;