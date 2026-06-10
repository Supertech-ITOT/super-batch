
export interface ActionResponse {
    id: number;
    name: string;
    code: string;
    active: boolean;
}
export interface CreateActionRequest {
    id: number;
    name: string;
    code: string;
    active: boolean;
}
export interface UpdateActionRequest {
    id: number;
    name: string;
    code: string;
    active: boolean;
}