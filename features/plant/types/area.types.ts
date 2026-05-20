export interface AreaResponse {
    id: number;
    name: string;
    plantId: number;
}
export interface CreateAreaRequest {
    name: string;
    plantId: number;
}
export interface UpdateAreaRequest {
    name: string;
}
