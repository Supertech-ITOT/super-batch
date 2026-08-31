export interface UnitSummaryResponse {
    id: number;
    name: string;
}

export interface UnitResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    areaId: number;
    areaName: string;
    recipeQuantityType: RecipeQuantityType;
    capacity: number;
    totalEquipment: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUnitRequest {
    name: string;
    code: string;
    description: string;
    recipeQuantityType: string;
    capacity: number;
    areaId: number;
}
export interface UpdateUnitRequest {
    name: string;
    code: string;
    description: string;
    capacity: number;
    areaId: number;
}

export enum RecipeQuantityType {
    KG = "KG",
    PERCENTAGE = "PERCENTAGE"
}

export const RecipeQuantityTypeBadgeStyles = {
    KG:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

    PERCENTAGE:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
} as const;
