
export interface PlantResponse {
    id: number;
    name: string;
    description: string;
    location: string;
    plantType: string;
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
    plantType: string;
}
export interface UpdatePlantRequest {
    name: string;
    description: string;
    location: string;
    plantType: string;
}

