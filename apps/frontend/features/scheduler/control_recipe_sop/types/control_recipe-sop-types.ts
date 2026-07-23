import { UomResponse } from "@/features/plant/common/types/uom.types";

export interface CreateControlRecipeSOPRequest {
    controlRecipeId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials?: ControlRecipeSOPMaterialRequest[];
    parameters?: ControlRecipeSOPParameterRequest[];
}

export interface UpdateControlRecipeSOPRequest {
    id: number;
    controlRecipeId: number;
    message: string;
    stdTime: number;
    transitionId: number;
    actionId: number
    materials: ControlRecipeSOPMaterialRequest[];
    parameters: ControlRecipeSOPParameterRequest[];
}

export interface ControlRecipeSOPResponse {
    id: number;
    controlRecipeId: number;
    stepNo: number;
    message: string;
    stdTime: number;
    transitionId: number;
    transitionName: string;
    actionId: number;
    actionName: string;
    fromEquipment: ControlRecipeSOPEquipmentResponse;
    toEquipment: ControlRecipeSOPEquipmentResponse;
    materials: ControlRecipeSOPMaterialResponse[];
    parameters: ControlRecipeSOPParameterResponse[];
}

export type ControlRecipeSOPMaterialRequest = {
    materialId: number;
    stdQty: number;
};
export type ControlRecipeSOPMaterialResponse = {
    id: number;
    materialId: number;
    materialName: string;
    stdQty: number;
};

export type ControlRecipeSOPParameterRequest = {
    parameterId: number;
    stdValue: number;
};
export type ControlRecipeSOPParameterResponse = {
    id: number;
    parameterId: number;
    parameterName: string;
    stdValue: number;
};

export type ControlRecipeSOPSummary = {
    batchSize: number;
    batchSizeUom: UomResponse;
    totalSteps: number;
    totalMaterials: number;
    totalDuration: number;
    materials: ControlRecipeSOPMaterialSummary[];
};

export type ControlRecipeSOPEquipmentResponse = {
    id: number;
    name: string;
    code: string;
}

export type ControlRecipeSOPMaterialSummary = {
    id: number;
    name: string;
    stdQty: number;
};