
export interface TransitionResponse {
    id: number;
    name: string;
    code: string;
    active: boolean;
}


export interface CreateTransitionRequest {
    id: number;
    name: string;
    code: string;
    active: boolean;
}
export interface UpdateTransitionRequest {
    id: number;
    name: string;
    code: string;
    active: boolean;
}