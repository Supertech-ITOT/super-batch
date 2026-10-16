import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { AbortRequest, BatchAbortResponse, BatchInfoResponse, BatchProgressResponse, BatchResponse, BatchSOPResponse } from "../types/batch.types";

export const abortBatch = async ({ batchNo, request, }: { batchNo: string; request: AbortRequest; }) => {
    const res = await api.post<ApiResponse<null>>(`/batches/${batchNo}/abort`, request,);
    return res.data;
};

export const getAbortDetails = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchAbortResponse>>(`/batches/${batchId}/abort-details`,);
    return res.data;
};

export const getBatchInfo = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchInfoResponse>>(`/batches/${batchId}/info`);
    return res.data;
}

export const getBatchProgress = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchProgressResponse>>(`/batches/${batchId}/progress`);
    return res.data;
}

export const getCurrentStepInfo = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchSOPResponse>>(`/batches/${batchId}/current-step-info`);
    return res.data;
}

export const getAllStepsById = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchResponse>>(`/batches/${batchId}/all-steps-info`);
    return res.data;
}