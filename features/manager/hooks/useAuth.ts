import { useMutation } from "@tanstack/react-query";
import { login, logout } from "../services/auth.service";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );
        }
    });
};


export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("user");
        }
    });
};

