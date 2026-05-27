import api from "@/lib/axios"
import { ApiResponse } from "@/types/api.types"
import { CreateEquipmentRequest, EquipmentResponse, UpdateEquipmentRequest } from "../types/equipment.types";
import { PlantHierarchyResponse } from "../types/plant-hierarchy.types";

export const getEquipments = async () => {
    const res = await api.get<ApiResponse<EquipmentResponse[]>>("/equipments");
    return res.data;
};

export const getEquipmentById = async (id: number) => {
    const res = await api.get<ApiResponse<EquipmentResponse>>(`/equipments/${id}`);
    return res.data;
};

export const createEquipment = async (data: CreateEquipmentRequest) => {
    const res = await api.post<ApiResponse<EquipmentResponse>>("/equipments", data);
    return res.data;
}

export const updateEquipment = async ({ id, data }: { id: number, data: UpdateEquipmentRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/equipments/${id}`, data);
    return res.data;
}

export const deleteEquipment = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/equipments/${id}`);
    return res.data;
};

export const getByUnitId = async (unitId: number) => {
    const res = await api.get<ApiResponse<EquipmentResponse[]>>(`/equipments/by-unit/${unitId}`);
    return res.data;
}; 