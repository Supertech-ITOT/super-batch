import { StatusType } from "./status.type";


export interface AreaResponse {
    id: number;
    name: string;
    description: string;
    status: StatusType;
    plantId: number;
    plantName: string;
    areaType: string;
    totalUnit: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAreaRequest {
    name: string;
    plantId: number;
    description: string;
    status: StatusType;
    areaType: string;
}
export interface UpdateAreaRequest {
    name: string;
    plantId: number;
    description: string;
    status: StatusType;
    areaType: string;
}
