import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json", },
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user") ?? "null");

        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
    }

    return config;
});


api.interceptors.response.use(
    (response) => response,
    (error) => {

        const message = error.response?.data?.message;
        const status = error.response?.status;

        if (
            status === 401 &&
            (message === "TOKEN_EXPIRED" || message === "INVALID_TOKEN")
        ) {
            localStorage.removeItem("user");
            toast.error("Session expired. Please login again to continue.");
            setTimeout(() => {
                window.location.replace("/");
            }, 1500);
        }

        return Promise.reject(error);
    }
);

export default api;