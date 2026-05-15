import api from "@/lib/axios";
import { PlantHierarchyResponse } from "../types/plant.types";
import { ApiResponse } from "@/types/api.types";

export const getPlantHierarchy = async () => {
    const res = await api.get<ApiResponse<PlantHierarchyResponse[]>>("/plant/hierarchy");
    return res.data;
};