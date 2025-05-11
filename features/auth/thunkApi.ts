import { auth } from "@/firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import api from "../../services/apiService";
import type { IUser } from "./types";

const feature = "/user";

export const getUserProfile = createAsyncThunk(
    "auth/getUserProfile",
    async (firebaseUid: string, thunkAPI) => {
        try {
            const response = await api.get(`${feature}/profile/${firebaseUid}/`);
            console.log("user profile response", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user profile:", {
                message: error.message,
                response: error.response,
                config: error.config
            });
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData: IUser, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/register/`, userData);
            if (response.data) {
                const { email, password } = userData;
                await signInWithEmailAndPassword(auth, email, password as any);
                await new Promise<void>((resolve) => {
                    const unsubscribe = auth.onAuthStateChanged((user) => {
                        if (user) {
                            resolve();
                            unsubscribe();
                        }
                    });
                });
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData: { email: string; password: string }, thunkAPI) => {
        try {
            const { email, password } = loginData;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("userCredential", userCredential);
            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                first_name: "",
                last_name: "",
                role: "",
                firebase_uid: userCredential.user.uid,
            }
            // return userCredential.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Login failed");
        }
    }
);

