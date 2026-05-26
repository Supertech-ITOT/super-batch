import { StatusType } from "./status.type";

export interface UnitResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    status: StatusType;
    areaId: number;
    areaName: string;
    unitType: string;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUnitRequest {
    name: string;
    code: string;
    description: string;
    status: StatusType;
    unitType: string;
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    code: string;
    description: string;
    status: StatusType;
    unitType: string;
    areaId: number;
}