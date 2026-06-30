import { UomResponse } from "@/features/plant/common/types/uom.types";

export interface RecipeHeaderResponse {
    id: number;
    name: string;
    description: string;
    status: RecipeHeaderStatus;
    batchSize: number;
    materialRecipeHeaderResponse: MaterialRecipeHeaderResponse,
    unitRecipeHeaderResponse: UnitRecipeHeaderResponse,
    userRecipeHeaderResponse: UserRecipeHeaderResponse,
    createdAt: string;
    updatedAt: string;
}


export interface CreateRecipeHeaderRequest {
    name: string;
    description: string;
    batchSize: number;
    materialId: number;
    unitId: number;
    status: string;
}

export interface UpdateRecipeHeaderRequest {
    name: string;
    description: string;
    batchSize: number;
    materialId: number;
    unitId: number;
    status: string;
}



export interface MaterialRecipeHeaderResponse {
    id: number;
    name: string;
    code: string;
}

export interface UnitRecipeHeaderResponse {
    id: number;
    name: string;
    code: string;
    batchSizeUom: UomResponse;
}

export interface UserRecipeHeaderResponse {
    id: number;
    name: string;
    email: string;
}

export enum RecipeHeaderStatus {
    RELEASED = "RELEASED",
    UNRELEASED = "UNRELEASED"
}

export const RecipeHeaderStatusBadgeStyles = {
    RELEASED:
        "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",

    UNRELEASED:
        "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700",
} as const;