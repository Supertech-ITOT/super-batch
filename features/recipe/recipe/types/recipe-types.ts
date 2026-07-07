export interface CreateRecipeRequest {
    recipeHeaderId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials?: RecipeMaterialRequest[];
    parameters?: RecipeParameterRequest[];
}

export interface UpdateRecipeRequest {
    id: number;
    recipeHeaderId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: RecipeMaterialRequest[];
    parameters: RecipeParameterRequest[];
}

export interface RecipeResponse {
    id: number;
    recipeHeaderId: number;
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
    materials: RecipeMaterialResponse[];
    parameters: RecipeParameterResponse[];
}

export type RecipeMaterialRequest = {
    materialId: number;
    stdQty: number;
};
export type RecipeMaterialResponse = {
    id: number;
    materialId: number;
    materialName: string;
    stdQty: number;
};


export type RecipeParameterRequest = {
    parameterId: number;
    stdValue: number;
};
export type RecipeParameterResponse = {
    id: number;
    parameterId: number;
    parameterName: string;
    stdValue: number;
};