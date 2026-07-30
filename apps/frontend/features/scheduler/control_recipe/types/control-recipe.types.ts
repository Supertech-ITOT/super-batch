
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
  capacity: number;
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
  SHEDULED = "SHEDULED",
  TRANSFERRED = "TRANSFERRED",
}

export const ControlRecipeStatusBadgeStyles = {
  SHEDULED:
    "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",

  TRANSFERRED:
    "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700",
} as const;
