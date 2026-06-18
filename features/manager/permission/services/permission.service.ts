import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { PermissionRequest, PermissionResponse } from "../../permission/types/permission.types"

export const getUserPermissions = async () => {
    const res = await api.get<ApiResponse<PermissionResponse[]>>("/permissions/me");
    return res.data;
};

export const getAllPermissions = async () => {
    const res = await api.get<ApiResponse<PermissionResponse[]>>("/permissions");
    return res.data;
};

export const createPermission = async (data: PermissionRequest) => {
    const res = await api.post<ApiResponse<void>>("/permissions", data);
    return res.data;
};

export const updatePermission = async ({ id, data }: { id: number, data: PermissionRequest }) => {
    const res = await api.put<ApiResponse<void>>(`/permissions/${id}`, data);
    return res.data;
};

export const deletePermission = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<void>>(`/permissions/${id}`);
    return res.data;
};