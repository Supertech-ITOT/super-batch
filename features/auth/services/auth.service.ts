import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    username: string;
    role: string;
}

export const login = async (data: LoginRequest) => {
    const res = await api.post<ApiResponse<LoginResponse>>("auth/login", data);
    return res.data;
}