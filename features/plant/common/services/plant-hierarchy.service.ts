import api from "@/common/lib/axios";
import { PlantHierarchyResponse } from "../types/plant-hierarchy.types";
import { ApiResponse } from "@/common/types/api.types";

export const getPlantHierarchy = async () => {
    const res = await api.get<ApiResponse<PlantHierarchyResponse[]>>("/plant/hierarchy");
    return res.data;
};