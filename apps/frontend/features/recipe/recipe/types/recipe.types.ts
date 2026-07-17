import { UomResponse } from "@/features/plant/common/types/uom.types";

export interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    status: RecipeStatus;
    batchSize: number;
    materialRecipeResponse: MaterialRecipeResponse,
    unitRecipeResponse: UnitRecipeResponse,
    userRecipeResponse: UserRecipeResponse,
    createdAt: string;
    updatedAt: string;
}


export interface CreateRecipeRequest {
    name: string;
    description: string;
    batchSize: number;
    materialId: number;
    unitId: number;
    status: string;
}

export interface UpdateRecipeRequest {
    name: string;
    description: string;
    batchSize: number;
    materialId: number;
    unitId: number;
    status: string;
}



export interface MaterialRecipeResponse {
    id: number;
    name: string;
    code: string;
}

export interface UnitRecipeResponse {
    id: number;
    name: string;
    code: string;
    batchSizeUom: UomResponse;
}

export interface UserRecipeResponse {
    id: number;
    name: string;
    email: string;
}

export enum RecipeStatus {
    RELEASED = "RELEASED",
    UNRELEASED = "UNRELEASED"
}

export const RecipeStatusBadgeStyles = {
    RELEASED:
        "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",

    UNRELEASED:
        "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700",
} as const;