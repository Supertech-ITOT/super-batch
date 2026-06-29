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

export enum RecipeHeaderStatus {
    RELEASED = "RELEASED",
    UNRELEASED = "UNRELEASED"
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