import { BatchSOPStatus, BatchStatus } from "@/features/batch/types/batch.types";
import { ResultStatus } from "@/features/check/types/check.types";
import { CheckParameterType } from "@/features/plant/check-parameter/types/checkParameter.types";

export type ReportFilterRequest = {
    search?: string;
    fromDate?: Date;
    toDate?: Date;
    batchStatus?: BatchStatus;
    masterRecipeId?: number;
    unitId?: number;
    productId?: number;
    page: number;
    size: number;
};

export type ReportFilterDetails = {
    fromDate?: Date;
    toDate?: Date;
    batchStatus?: string;
    unitName?: string;
    productName?: string;
    masterRecipeName?: string;
};

export interface BatchesResponse {
    id: number;
    batchNo: string;
    startDateTime: string | null;
    endDateTime: string | null;
    unit: UnitResponse;
    product: ProductResponse;
    masterRecipeName: string;
    controlRecipeName: string;
    shiftIncharge: string;
    standardTime: number;
    actualTime: number;
    varianceTime: number;
    standardSize: number;
    actualSize: number;
    varianceSize: number;
    totalSteps: number;
    completedSteps: number;
    completionPercentage: number;
    status: BatchStatus;
}



export type UnitResponse = {
    id: number;
    name: string;
    code: string;
};

export type ProductResponse = {
    id: number;
    name: string;
    code: string;
};


export type BatchSopResponse = {
    id: number;
    stepNo: number;
    action: string;
    transition: string;
    message: string;
    fromEquipment: string | null;
    toEquipment: string | null;
    startDateTime: string | null;
    endDateTime: string | null;
    standardTime: number;
    actualTime: number;
    varianceTime: number;
    status: BatchSOPStatus;
    remark: string | null;
};


export interface MaterialQuantityResponse {
    id: number;
    batchNo: string;
    statsData: MaterialStatisticsData[];
    chartData: MaterialQuantityChartData[];
    tableData: MaterialQuantityTableData[];
}

export interface MaterialStatisticsData {
    label: string;
    value: number;
    highlight: boolean;
    unit: string;
}

export interface MaterialQuantityChartData {
    materialId: number;
    materialName: string;
    materialCode: string;
    stdQty: number;
    actQty: number;
}

export interface MaterialQuantityTableData {
    stepNo: number;
    loop: number | null;
    startDateTime: string | null;
    endDateTime: string | null;
    materialId: number;
    materialName: string;
    materialCode: string;
    stdQty: number | null;
    actQty: number | null;
    varQty: number | null;
    varPct: number | null;
}


export interface ParameterValueResponse {
    id: number;
    batchNo: string;
    statsData: ParameterValueStatisticsData[];
    data: ParameterValueData[];
}


export interface ParameterValueStatisticsData {
    parameterId: number;
    parameterName: string;
    label: string;
    value: number;
    highlight: boolean;
    unit: string;
}

export interface ParameterValueData {
    parameterId: number;
    parameterName: string;
    stepNo: number;
    dateTime: string;
    stdVal: number;
    actVal: number | null;
    deviation: number | null;
    deviationPercent: number | null;
}

export interface QualityCheckResponse {
    id: number;
    batchNo: string;
    statsData: QualityCheckStatisticsData[];
    list: QualityCheckSampleList[];
}

export interface QualityCheckStatisticsData {
    label: string;
    value: number;
    isPassed?: boolean;
}

export interface QualityCheckSampleList {
    id: number;
    sampleDateTime: string;
    sampleNo: string;
    totalParameters: number;
    passedParameters: number;
    failedParameters: number;
    results: QualityCheckSampleResult[];
}

export interface QualityCheckSampleResult {
    id: number;
    parameterName: string;
    stepNo: number;
    loop: number;
    value: string;
    type: CheckParameterType;
    min?: number;
    max?: number;
    allowedOptions?: string[];
    notAllowedOptions?: string[];
    resultStatus: ResultStatus;
}


export interface BatchReportResponse {
    info: BatchesResponse;
    sops: BatchSopResponse[];
    mat: MaterialQuantityResponse;
    par: ParameterValueResponse;
    qc: QualityCheckResponse;
}

export type ReportMetadataResponse = {
    generatedBy: string;
    generatedByEmail: string;
    generatedAt: string;
    companyName: string;
    companyLogo: string;
};