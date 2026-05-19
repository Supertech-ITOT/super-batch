import api from "@/lib/axios";
import { CreatePlantRequest, Plant, UpdatePlantRequest } from "../types/plant.types";
import { ApiResponse } from "@/types/api.types";

export const getPlants = async () => {
    const res = await api.get<ApiResponse<Plant[]>>("/plants");
    return res.data;
};

export const getPlantById = async (id: number) => {
    const res = await api.get<ApiResponse<Plant>>(`/plants/${id}`);
    return res.data;
};

export const createPlant = async (data: CreatePlantRequest) => {
    const res = await api.post<ApiResponse<Plant>>("/plants", data);
    return res.data;
};

export const updatePlant = async ({ id, data }: { id: number, data: UpdatePlantRequest }) => {
    const res = await api.patch<ApiResponse<Plant>>(`/plants/${id}`, data);
    return res.data;
};