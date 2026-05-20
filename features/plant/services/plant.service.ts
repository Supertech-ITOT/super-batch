import api from "@/lib/axios";
import { CreatePlantRequest, PlantResponse, UpdatePlantRequest } from "../types/plant.types";
import { ApiResponse } from "@/types/api.types";

export const getPlants = async () => {
    const res = await api.get<ApiResponse<PlantResponse[]>>("/plants");
    return res.data;
};

export const getPlantById = async (id: number) => {
    const res = await api.get<ApiResponse<PlantResponse>>(`/plants/${id}`);
    return res.data;
};

export const createPlant = async (data: CreatePlantRequest) => {
    const res = await api.post<ApiResponse<null>>("/plants", data);
    return res.data;
};

export const updatePlant = async ({ id, data }: { id: number, data: UpdatePlantRequest }) => {
    const res = await api.patch<ApiResponse<null>>(`/plants/${id}`, data);
    return res.data;
};

export const deletePlant = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/plants/${id}`);
    return res.data;
};
