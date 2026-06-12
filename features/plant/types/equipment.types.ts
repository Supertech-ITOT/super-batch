import { UomResponse } from "./uom.types";


export interface EquipmentResponse {
    id: number;
    name: string;
    description: string;
    code: string;
    capacity: number;
    unitId: number;
    unitName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEquipmentRequest {
    name: string;
    description: string;
    code: string;
    capacity: number;
    unitId: number;
}
export interface UpdateEquipmentRequest {
    name: string;
    description: string;
    code: string;
    capacity: number;
    unitId: number;
}