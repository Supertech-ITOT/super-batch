
export interface ActionResponse {
    id: number;
    name: string;
    code: string;
    active: boolean;
}
export interface CreateActionRequest {
    name: string;
    code: string;
    active: boolean;
}
export interface UpdateActionRequest {
    name: string;
    code: string;
    active: boolean;
}