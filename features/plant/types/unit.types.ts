import { UomResponse } from "./uom.types";


export enum UnitType {
    MAIN_EQUIPMENT = "MAIN_EQUIPMENT",
    SUB_EQUIPMENT = "SUB_EQUIPMENT"
}

export interface UnitResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    areaId: number;
    areaName: string;
    capacity: number;
    batchSizeUom: UomResponse;
    unitType: string;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUnitRequest {
    name: string;
    code: string;
    description: string;
    capacity: number;
    batchSizeUom: string;
    unitType: string;
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    code: string;
    description: string;
    capacity: number;
    batchSizeUom: string;
    unitType: string;
    areaId: number;
}