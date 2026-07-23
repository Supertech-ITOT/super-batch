import { UomResponse } from "@/features/plant/common/types/uom.types";

export interface ControlRecipeResponse {
  id: number;
  batchNo: string;
  name: string;
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
  capacity: number;
  batchSizeUom: UomResponse;
}

export interface UserControlRecipeResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export enum ControlRecipeStatus {
  SHEDULED = "SHEDULED",
  TRANSFER = "TRANSFER",
}

export const ControlRecipeStatusBadgeStyles = {
  SHEDULED:
    "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",

  TRANSFER:
    "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700",
} as const;
