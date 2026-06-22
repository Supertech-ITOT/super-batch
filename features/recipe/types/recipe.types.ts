export interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    version: number;
    status: string;
    batchSize: number;
    batchSizeUom: string;
    createdBy: string;
    lastModified: string
}

export interface CreateRecipeRequest {
    name: string;
    description: string;
    batchSize: number;
    batchSizeUom: string;
}

export interface UpdateRecipeRequest {
    name: string;
    description: string;
    batchSize: number;
    batchSizeUom: string;
}