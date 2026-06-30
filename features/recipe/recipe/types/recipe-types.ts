export interface CreateRecipeRequest {
    recipeHeaderId: number;
    stepNo: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: RecipeMaterialRequest[];
    parameters: RecipeParameterRequest[];
}

export interface UpdateRecipeRequest {
    recipeHeaderId: number;
    stepNo: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: RecipeMaterialRequest[];
    parameters: RecipeParameterRequest[];
}

export interface RecipeResponse {
    stepNo: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: RecipeMaterialResponse[];
    parameters: RecipeParameterResponse[];
}

export interface RecipeMaterial {
    id: number;
    stdQty: number;
}

export type RecipeMaterialRequest = RecipeMaterial;
export type RecipeMaterialResponse = RecipeMaterial;

export interface RecipeParameter {
    id: number;
    stdValue: number;
}

export type RecipeParameterRequest = RecipeParameter;
export type RecipeParameterResponse = RecipeParameter;