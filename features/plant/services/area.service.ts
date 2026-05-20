import api from "@/lib/axios";
import { CreateAreaRequest, AreaResponse, UpdateAreaRequest } from "../types/area.types";
import { ApiResponse } from "@/types/api.types";

export const getAreas = async () => {
    const res = await api.get<ApiResponse<AreaResponse[]>>("/areas");
    return res.data;
};

export const getAreaById = async (id: number) => {
    const res = await api.get<ApiResponse<AreaResponse>>(`/areas/${id}`);
    return res.data;
};

export const createArea = async (data: CreateAreaRequest) => {
    const res = await api.post<ApiResponse<null>>("/areas", data);
    return res.data;
};

export const updateArea = async ({ id, data }: { id: number, data: UpdateAreaRequest }) => {
    const res = await api.patch<ApiResponse<null>>(`/areas/${id}`, data);
    return res.data;
};

export const deleteUnit = async (id: number) => {
    const res = await api.delete<ApiResponse<null>>(`/areas/${id}`);
    return res.data;
};

export const getByPlantId = async (plantId: number) => {
    const res = await api.get<ApiResponse<AreaResponse[]>>(`/areas/by-plant/${plantId}`);
    return res.data;
};