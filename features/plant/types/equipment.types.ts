export interface EquipmentResponse {
    id: number;
    name: string;
    equipmentId: number;
    equipmentType: string;
}
export interface CreateEquipmentRequest {
    name: string;
    equipmentType: string;
    equipmentId: number;
}
export interface UpdateEquipmentRequest {
    name: string;
    equipmentType: string;
}