import { auth } from "@/firebaseConfig";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
console.log("API_BASE_URL", API_BASE_URL);
const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await auth.currentUser?.getIdToken();
    console.log("using token", token);
    if (token) {
        console.log("setting token", token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
