

export interface AreaResponse {
    id: number;
    name: string;
    description: string;
    plantId: number;
    plantName: string;
    totalUnit: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateAreaRequest {
    name: string;
    plantId: number;
    description: string;
}
export interface UpdateAreaRequest {
    name: string;
    plantId: number;
    description: string;
}
