import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import chatReducer from "./slices/chatSlice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage

// 1. Saare reducers ko combine karein
const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
});

// 2. Persist configuration set karein
const persistConfig = {
    key: "aura-root", // LocalStorage mein isi naam se data save hoga
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Store configure karein
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // redux-persist ke internal actions ko ignore karne ke liye
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;