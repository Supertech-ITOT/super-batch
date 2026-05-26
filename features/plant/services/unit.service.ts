import api from "@/lib/axios"
import { ApiResponse } from "@/types/api.types"
import { CreateUnitRequest, UnitResponse, UpdateUnitRequest } from "../types/unit.types"

export const getUnits = async () => {
    const res = await api.get<ApiResponse<UnitResponse[]>>("/units");
    return res.data;
};

export const getUnitById = async (id: number) => {
    const res = await api.get<ApiResponse<UnitResponse>>(`/units/${id}`);
    return res.data;
};

export const createUnit = async (data: CreateUnitRequest) => {
    const res = await api.post<ApiResponse<UnitResponse>>("/units", data);
    return res.data;
};

export const updateUnit = async ({ id, data }: { id: number, data: UpdateUnitRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/units/${id}`, data);
    return res.data;
};

export const deleteUnit = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/units/${id}`);
    return res.data;
};

export const getByAreaId = async (areaId: number) => {
    const res = await api.get<ApiResponse<UnitResponse[]>>(`/units/by-area/${areaId}`);
    return res.data;
};