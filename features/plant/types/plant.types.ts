import { StatusType } from "../enum/status.enum";

export interface PlantResponse {
    id: number;
    name: string;
    description: string;
    location: string;
    status: StatusType;
    plantType: string;
    totalArea: number;
    totalUnit: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreatePlantRequest {
    name: string;
}
export interface UpdatePlantRequest {
    name: string;
}

