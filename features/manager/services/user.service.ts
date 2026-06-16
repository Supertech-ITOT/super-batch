import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { UserRequest, UserResponse } from "../types/user.types";

export const getAllUsers = async () => {
    const res = await api.get<ApiResponse<UserResponse[]>>("/users");
    return res.data;
};

export const createUser = async (data: UserRequest) => {
    const res = await api.post<ApiResponse<void>>("/users", data);
    return res.data;
};

export const updateUser = async (id: number, data: UserRequest) => {
    const res = await api.put<ApiResponse<void>>(`/users/${id}`, data);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await api.delete<ApiResponse<void>>(`/users/${id}`);
    return res.data;
};