import api from "@/lib/axios";
import { Plant } from "../types/plant.types";
import { ApiResponse } from "@/types/api.types";

export const getPlants = async () => {
    const res = await api.get<ApiResponse<Plant[]>>("/plants");
    return res.data;
};

export const createPlant = async (name: string) => {
    const res = await api.post<ApiResponse<Plant>>("/plants", { name });
    return res.data;
};