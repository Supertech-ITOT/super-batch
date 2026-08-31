import { RecipeQuantityType } from "@/features/plant/unit/types/unit.types";

export interface ControlRecipeResponse {
  id: number;
  batchNo: string;
  name: string;
  unit: UnitControlRecipeResponse
  recipe: MasterRecipeResponse;
  status: ControlRecipeStatus;
  batchSize: number;
  createdBy: UserControlRecipeResponse;
  shiftIncharge: UserControlRecipeResponse;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateControlRecipeRequest {
  batchNo: string;
  batchSize: number;
  scheduledAt: string; //YYYY-MM-DDTHH:mm:ss
  recipeId: number;
  unitId: number;
  equipmentMappings: EquipmentMappingRequest[];
  shiftInchargeId: number;
}

export interface UpdateControlRecipeRequest {
  batchNo: string;
  batchSize: number;
  scheduledAt: string; //YYYY-MM-DDTHH:mm:ss
  shiftInchargeId: number;
}

export interface MasterRecipeResponse {
  id: number;
  name: string;
  product: string;
  description: string;
  unit: UnitControlRecipeResponse;

}
export interface UnitControlRecipeResponse {
  id: number;
  name: string;
  code: string;
  capacity: number;
  recipeQuantityType: RecipeQuantityType,

}

export interface UserControlRecipeResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface EquipmentMappingRequest {
  recipeEquipmentId: number;
  executionEquipmentId: number;
}

export interface EquipmentMappingResponse {
  equipmentId: number;
  equipmentName: string;
  mappedEquipmentId: number | null;
  autoMapped: boolean;
}

export enum ControlRecipeStatus {
  SCHEDULED = "SCHEDULED",
  TRANSFERRED = "TRANSFERRED",
}

export const ControlRecipeStatusBadgeStyles = {
  SCHEDULED:
    "text-green-800 bg-green-100 border-green-400 dark:text-green-300 dark:bg-green-950 dark:border-green-600",

  TRANSFERRED:
    "text-green-600 bg-green-50 border-green-100 dark:text-green-500 dark:bg-green-950/30 dark:border-green-900",
} as const;
