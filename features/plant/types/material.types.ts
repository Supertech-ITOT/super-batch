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
    id: number;
    name: string;
    code: string;
    description: string;
    uom: string;
    materialType: string;
}
export interface UpdateMaterialRequest {
    id: number;
    name: string;
    code: string;
    description: string;
    uom: string;
    materialType: string;
}

export enum MaterialType {
    RAW_MATERIAL = "RAW_MATERIAL",
    INTERMEDIATE = "INTERMEDIATE",
    FINISHED_PRODUCT = "FINISHED_PRODUCT",
    PACKAGING = "PACKAGING",
    BY_PRODUCT = "BY_PRODUCT",
    WASTE = "WASTE",
}

export const MaterialTypeBadgeStyles = {
    RAW_MATERIAL:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

    INTERMEDIATE:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

    FINISHED_PRODUCT:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",

    PACKAGING:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",

    BY_PRODUCT:
        "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",

    WASTE:
        "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
} as const;