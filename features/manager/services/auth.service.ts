import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const login = async (request: LoginRequest) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", request);
    return response.data;
}

