export interface UnitResponse {
    id: number;
    name: string;
    unitType: string;
    areaId: number;
}
export interface CreateUnitRequest {
    name: string;
    unitType: string;
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    unitType: string;
}