
export interface UnitResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    status: string;
    areaId: number;
    areaName: string;
    unitType: string;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUnitRequest {
    name: string;
    unitType: string;
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    unitType: string;
    areaId: number;
}