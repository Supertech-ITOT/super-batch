import { UomResponse } from "../../common/types/uom.types";

export interface MaterialResponse {
    id: number;
    name: string;
    description: string;
    code: string;
    materialType: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateMaterialRequest {
    name: string;
    code: string;
    description: string;
    materialType: string;
}
export interface UpdateMaterialRequest {
    name: string;
    code: string;
    description: string;
    materialType: string;
}

export enum MaterialType {
    RAW_MATERIAL = "RAW_MATERIAL",
    FINISHED_PRODUCT = "FINISHED_PRODUCT"
}

export const MaterialTypeBadgeStyles = {
    RAW_MATERIAL:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

    FINISHED_PRODUCT:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
} as const;