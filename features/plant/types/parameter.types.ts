
export interface ParameterResponse {
    id: number;
    name: string;
    code: string;
    uom: string;
    active: boolean;
}


export interface CreateParameterRequest {
    name: string;
    code: string;
    uom: string;
    active: boolean;
}

export interface UpdateParameterRequest {
    name: string;
    code: string;
    uom: string;
    active: boolean;
}