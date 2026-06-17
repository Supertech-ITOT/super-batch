import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { UnitConnectionRequest, UnitConnectionResponse } from "../types/unit-connection.types";


export const getUnitConnections = async () => {
    const res = await api.get<ApiResponse<UnitConnectionResponse[]>>("/unit-connections");
    return res.data;
};

export const getUnitConnectionById = async (id: number) => {
    const res = await api.get<ApiResponse<UnitConnectionResponse>>(`/unit-connections/${id}`);
    return res.data;
};

export const createUnitConnection = async (data: UnitConnectionRequest) => {
    const res = await api.post<ApiResponse<null>>("/unit-connections", data);
    return res.data;
};

export const updateUnitConnection = async ({ id, data, }: { id: number; data: UnitConnectionRequest; }) => {
    const res = await api.put<ApiResponse<null>>(`/unit-connections/${id}`, data);
    return res.data;
};

export const deleteUnitConnection = async ({ id, }: { id: number; }) => {
    const res = await api.delete<ApiResponse<null>>(`/unit-connections/${id}`);
    return res.data;
};