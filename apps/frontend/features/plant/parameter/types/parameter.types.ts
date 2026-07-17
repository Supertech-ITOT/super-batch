import { UomResponse } from "../../common/types/uom.types";

export interface ParameterResponse {
    id: number;
    name: string;
    uom: UomResponse;
}


export interface CreateParameterRequest {
    name: string;
    uom: string;
}
export interface UpdateParameterRequest {
    name: string;
    uom: string;
}
