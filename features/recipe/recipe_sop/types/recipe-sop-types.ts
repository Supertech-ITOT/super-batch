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
    fromEquipmentId: number;
    fromEquipmentName: string;
    toEquipmentId: number;
    toEquipmentName: string;
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