import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL:
    typeof window !== "undefined"
      ? window.__SUPERBATCH_CONFIG__?.API_URL
      : undefined,
  headers: { "Content-Type": "application/json" },
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


let isRedirectingForAuth = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;
    const status = error.response?.status;

    if (
      typeof window !== "undefined" &&
      status === 401 &&
      ["TOKEN_EXPIRED", "INVALID_TOKEN"].includes(message) &&
      !isRedirectingForAuth
    ) {
      isRedirectingForAuth = true;

      localStorage.removeItem("user");

      toast.error(
        message === "TOKEN_EXPIRED"
          ? "Your session has expired. Please log in again."
          : "Your session is invalid. Please log in again."
      );

      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);


export default api;
