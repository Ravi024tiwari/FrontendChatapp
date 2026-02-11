import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        users: [], 
        selectedConversation: null, 
        messages: [], 
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },

        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        // Naya Reducer: Specific user ka unread count reset karne ke liye
        clearUnreadCount: (state, action) => {
            const userId = action.payload; // Selected user ki ID
            state.users = state.users.map((user) => 
                user._id === userId ? { ...user, unreadCount: 0 } : user
            );
        },
    },
});

export const { setUsers, setSelectedConversation, setMessages, clearUnreadCount } = chatSlice.actions;
export default chatSlice.reducer;