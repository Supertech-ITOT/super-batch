
export interface ParameterResponse {
    id: number;
    name: string;
    description: string;
    code: string;
    uom: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateParameterRequest {
    name: string;
    code: string;
    description: string;
    uom: string;
}
export interface UpdateParameterRequest {
    name: string;
    code: string;
    description: string;
    uom: string;
}