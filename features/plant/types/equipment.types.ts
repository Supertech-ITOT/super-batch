import { StatusType } from "../../common/types/status.type";
import { UomResponse } from "./uom.types";


export interface EquipmentResponse {
    id: number;
    name: string;
    description: string;
    tagName: string;
    status: StatusType;
    uom: UomResponse;
    unitId: number;
    unitName: string;
    equipmentType: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEquipmentRequest {
    name: string;
    description: string;
    tagName: string;
    status: StatusType;
    uom: string;
    equipmentType: string;
    unitId: number;
}
export interface UpdateEquipmentRequest {
    name: string;
    description: string;
    tagName: string;
    status: StatusType;
    uom: string;
    equipmentType: string;
    unitId: number;
}