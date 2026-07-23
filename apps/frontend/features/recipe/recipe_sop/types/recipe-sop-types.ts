import { UomResponse } from "@/features/plant/common/types/uom.types";

export interface CreateRecipeSOPRequest {
    recipeId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials?: RecipeSOPMaterialRequest[];
    parameters?: RecipeSOPParameterRequest[];
}

export interface UpdateRecipeSOPRequest {
    id: number;
    recipeId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: RecipeSOPMaterialRequest[];
    parameters: RecipeSOPParameterRequest[];
}

export interface RecipeSOPResponse {
    id: number;
    recipeId: number;
    stepNo: number;
    message: string;
    stdTime: number;
    transitionId: number;
    transitionName: string;
    actionId: number;
    actionName: string;
    fromEquipment: RecipeSOPEquipmentResponse;
    toEquipment: RecipeSOPEquipmentResponse;
    materials: RecipeSOPMaterialResponse[];
    parameters: RecipeSOPParameterResponse[];
}

export type RecipeSOPMaterialRequest = {
    materialId: number;
    stdQty: number;
};
export type RecipeSOPMaterialResponse = {
    id: number;
    materialId: number;
    materialName: string;
    stdQty: number;
};

export type RecipeSOPParameterRequest = {
    parameterId: number;
    stdValue: number;
};
export type RecipeSOPParameterResponse = {
    id: number;
    parameterId: number;
    parameterName: string;
    stdValue: number;
};

export type RecipeSOPEquipmentResponse = {
    id: number;
    name: string;
    code: string;
}

export type RecipeSOPMaterialSummary = {
    id: number;
    name: string;
    stdQty: number;
};

export type RecipeSOPSummary = {
    batchSize: number;
    batchSizeUom: UomResponse;
    totalSteps: number;
    totalMaterials: number;
    totalDuration: number;
    materials: RecipeSOPMaterialSummary[];
};