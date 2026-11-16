import { ApiResponse } from "@/common/types/api.types";
import { BatchesResponse, BatchSopResponse, MaterialQuantityResponse, ParameterValueResponse, QualityCheckResponse, ReportFilterRequest } from "../types/report.types";
import api from "@/common/lib/axios";
import { PageResponse } from "@/features/audit/types/audit.types";

export const getBatches = async (request: ReportFilterRequest) => {
    const res = await api.post<ApiResponse<PageResponse<BatchesResponse>>>("/reports/batches/search", request);
    return res.data;
};
export const getBatchInfoById = async (id: number) => {
    const res = await api.get<ApiResponse<BatchesResponse>>(`/reports/batches/${id}`);
    return res.data;
};
export const getBatchSopByBatchId = async (id: number) => {
    const res = await api.get<ApiResponse<BatchSopResponse[]>>(`/reports/batches/${id}/sops`);
    return res.data;
};

export const getMaterialQuantityByBatchId = async (id: number) => {
    const res = await api.get<ApiResponse<MaterialQuantityResponse>>(`/reports/batches/${id}/material-quantity`);
    return res.data;
};

export const getParameterValueByBatchId = async (id: number) => {
    const res = await api.get<ApiResponse<ParameterValueResponse>>(`/reports/batches/${id}/parameter-value`);
    return res.data;
};

export const getQualityCheckByBatchId = async (id: number) => {
    const res = await api.get<ApiResponse<QualityCheckResponse>>(`/reports/batches/${id}/quality-check`);
    return res.data;
};