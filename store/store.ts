import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import childrenReducer from "../features/child/childSlice";
import concernReducer from "../features/concerns/concerns.slice";
import counterReducer from "../features/counter/counter.slice";
const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    children: childrenReducer,
    concerns: concernReducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    // helps to persist my auth slice
    whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;