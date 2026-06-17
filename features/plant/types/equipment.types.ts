import { UomResponse } from "./uom.types";


export interface EquipmentResponse {
    id: number;
    name: string;
    description: string;
    tagName: string;
    equipmentType: string;
    unitId: number;
    unitName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEquipmentRequest {
    name: string;
    description: string;
    tagName: string;
    equipmentType: string;
    unitId: number;
}
export interface UpdateEquipmentRequest {
    name: string;
    description: string;
    tagName: string;
    equipmentType: string;
    unitId: number;
}