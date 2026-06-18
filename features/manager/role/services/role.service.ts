import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { RoleRequest, RoleResponse } from "../types/role.types";

export const getAllRole = async () => {
    const res = await api.get<ApiResponse<RoleResponse[]>>("/roles");
    return res.data;
};

export const getRoleById = async (id: number) => {
    const res = await api.get<ApiResponse<RoleResponse>>(`/roles/${id}`);
    return res.data;
}

export const createRole = async (data: RoleRequest) => {
    const res = await api.post<ApiResponse<void>>("/roles", data);
    return res.data;
}

export const updateRole = async ({ id, data }: { id: number, data: RoleRequest }) => {
    const res = await api.put<ApiResponse<void>>(`/roles/${id}`, data);
    return res.data;
};

export const deleteRole = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<void>>(`/roles/${id}`);
    return res.data;
};