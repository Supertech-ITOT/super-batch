
export interface PlantResponse {
    id: number;
    name: string;
    description: string;
    location: string;
    totalArea: number;
    totalUnit: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreatePlantRequest {
    name: string;
    description: string;
    location: string;
}
export interface UpdatePlantRequest {
    name: string;
    description: string;
    location: string;
}

