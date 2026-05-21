export interface EquipmentResponse {
    id: number;
    name: string;
    unitId: number;
    equipmentType: string;
}
export interface CreateEquipmentRequest {
    name: string;
    equipmentType: string;
    unitId: number;
}
export interface UpdateEquipmentRequest {
    name: string;
    equipmentType: string;
    unitId: number;
}