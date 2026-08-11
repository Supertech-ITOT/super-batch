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
    equipmentType: EquipmentType;
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

export enum EquipmentType {
    MAIN_EQUIPMENT = "MAIN_EQUIPMENT",
    SUB_EQUIPMENT = "SUB_EQUIPMENT",
}

export const EquipmentTypeBadgeStyles = {
    MAIN_EQUIPMENT:
        "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",

    SUB_EQUIPMENT:
        "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700",
} as const;
