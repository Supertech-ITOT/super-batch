import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { ChangePasswordRequest, ResetFirstPasswordRequest, ResetPasswordRequest, UpdateUserRequest, UserRequest, UserResponse } from "../../user/types/user.types";

export const getAllUsers = async () => {
    const res = await api.get<ApiResponse<UserResponse[]>>("/users");
    return res.data;
};

export const getUserById = async (id: number) => {
    const res = await api.get<ApiResponse<UserResponse>>(`/users/${id}`);
    return res.data;
}
export const getCurrentUser = async () => {
    const res = await api.get<ApiResponse<UserResponse>>(`/users/me`);
    return res.data;
}

export const createUser = async (data: UserRequest) => {
    const res = await api.post<ApiResponse<void>>("/users", data);
    return res.data;
};

export const updateUser = async ({ id, data }: { id: number, data: UpdateUserRequest }) => {
    const res = await api.put<ApiResponse<void>>(`/users/${id}`, data);
    return res.data;
};

export const deleteUser = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<void>>(`/users/${id}`);
    return res.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
    const res = await api.put<ApiResponse<void>>("/users/me/change-password", data);
    return res.data;
};

export const resetFirstPassword = async (data: ResetFirstPasswordRequest) => {
    const res = await api.put<ApiResponse<void>>("/users/me/reset-first-password", data);
    return res.data;
};

export const resetPassword = async ({ id, data, }: { id: number; data: ResetPasswordRequest; }) => {
    const res = await api.put<ApiResponse<void>>(`/users/${id}/reset-password`, data);
    return res.data;
};