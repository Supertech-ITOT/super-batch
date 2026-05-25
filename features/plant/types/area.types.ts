import { StatusType } from "../enum/status.enum";

export interface AreaResponse {
    id: number;
    name: string;
    description: string;
    location: string;
    status: StatusType;
    areaType: string;
    totalUnit: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAreaRequest {
    name: string;
    plantId: number;
}
export interface UpdateAreaRequest {
    name: string;
    plantId: number;
}
