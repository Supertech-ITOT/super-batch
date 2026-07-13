import { UnitSummaryResponse } from "../../unit/types/unit.types";



export interface AssignEquipmentRequest {
    unitId: number;
    equipmentId: number;
}

export interface UnAssignEquipmentRequest {
    unitId: number;
    equipmentId: number;
}

export interface EquipmentResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    capacity: number;
    units: UnitSummaryResponse[];
    creatorUnitId: number;
    creatorUnitName: string;
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
}