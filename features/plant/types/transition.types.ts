
export interface TransitionResponse {
    id: number;
    name: string;
    code: string;
    active: boolean;
}


export interface CreateTransitionRequest {
    name: string;
    code: string;
    active: boolean;
}
export interface UpdateTransitionRequest {
    name: string;
    code: string;
    active: boolean;
}