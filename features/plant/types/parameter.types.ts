import { UomResponse } from "./uom.types";

export interface ParameterResponse {
    id: number;
    name: string;
    code: string;
    uom: UomResponse;
    active: boolean;
}


export interface CreateParameterRequest {
    id: number;
    name: string;
    code: string;
    uom: string;
    active: boolean;
}

export interface UpdateParameterRequest {
    id: number;
    name: string;
    code: string;
    uom: string;
    active: boolean;
}