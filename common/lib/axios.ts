import { getUser } from "@/features/manager/types/auth.types";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    try {
        const user = getUser();
        if (user) {
            if (user?.accessToken) {
                config.headers.Authorization =
                    `Bearer ${user.accessToken}`;
            }
        }
    } catch {
        localStorage.removeItem("user");
    }

    return config;
});

export default api;