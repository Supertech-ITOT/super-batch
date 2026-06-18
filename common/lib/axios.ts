import { getUser } from "@/features/manager/auth/types/auth.types";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json", },
});

api.interceptors.request.use((config) => {
    const user = getUser();

    if (user?.accessToken) {
        config.headers.Authorization =
            `Bearer ${user.accessToken}`;
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
            (
                message === "TOKEN_EXPIRED" ||
                message === "INVALID_TOKEN"
            )
        ) {
            localStorage.removeItem("user");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;