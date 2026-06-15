import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    try {
        const user = localStorage.getItem("user");

        if (user) {
            const parsedUser = JSON.parse(user);

            if (parsedUser?.accessToken) {
                config.headers.Authorization =
                    `Bearer ${parsedUser.accessToken}`;
            }
        }
    } catch {
        localStorage.removeItem("user");
    }

    return config;
});

export default api;