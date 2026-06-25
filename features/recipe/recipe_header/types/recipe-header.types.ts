export interface RecipeHeaderResponse {
    id: number;
    name: string;
    description: string;
    version: number;
    status: string;
    batchSize: number;
    batchSizeUom: string;
    createdBy: string;
    updatedAt: string;
}

export interface CreateRecipeHeaderRequest {
    name: string;
    description: string;
    batchSize: number;
    batchSizeUom: string;
}

export interface UpdateRecipeHeaderRequest {
    name: string;
    description: string;
    batchSize: number;
    batchSizeUom: string;
}