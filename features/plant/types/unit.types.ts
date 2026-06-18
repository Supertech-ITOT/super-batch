import { UomResponse } from "./uom.types";

export interface UnitSummaryResponse {
    id: number;
    name: string;
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
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    code: string;
    description: string;
    capacity: number;
    batchSizeUom: string;
    areaId: number;
}
