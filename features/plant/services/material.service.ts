import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { CreateMaterialRequest, MaterialResponse, UpdateMaterialRequest } from "../types/material.types";


export const getMaterials = async () => {
    const res = await api.get<ApiResponse<MaterialResponse[]>>("/materials");
    return res.data;
};

export const getMaterialById = async (id: number) => {
    const res = await api.get<ApiResponse<MaterialResponse>>(`/materials/${id}`);
    return res.data;
};

export const createMaterial = async (data: CreateMaterialRequest) => {
    const res = await api.post<ApiResponse<null>>("/materials", data);
    return res.data;
};

export const updateMaterial = async ({ id, data }: { id: number, data: UpdateMaterialRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/materials/${id}`, data);
    return res.data;
};

export const deleteMaterial = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/materials/${id}`);
    return res.data;
};

