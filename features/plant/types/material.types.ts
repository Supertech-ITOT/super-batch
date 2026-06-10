import { UomResponse } from "./uom.types";

export interface MaterialResponse {
    id: number;
    name: string;
    description: string;
    code: string;
    materialType: string;
    uom: UomResponse;
    createdAt: string;
    updatedAt: string;
}
export interface CreateMaterialRequest {
    name: string;
    code: string;
    description: string;
    uom: string;
    materialType: string;
}
export interface UpdateMaterialRequest {
    name: string;
    code: string;
    description: string;
    uom: string;
    materialType: string;
}