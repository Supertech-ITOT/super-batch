import { ApiResponse } from "@/common/types/api.types";
import { BatchCheckRequest, BatchCheckResponse, MaterialCorrectionRequest, MaterialCorrectionResponse } from "../types/check.types";
import api from "@/common/lib/axios";

export const createBatchCheck = async (batchId: number, request: BatchCheckRequest,) => {
  const res = await api.post<ApiResponse<null>>(`/batch-checks/${batchId}`, request,);
  return res.data;
};

export const getBatchChecks = async (batchId: number) => {
  const res = await api.get<ApiResponse<BatchCheckResponse[]>>(`/batch-checks/${batchId}`);
  return res.data;
};

export const createMaterialCorrection = async (batchId: number, request: MaterialCorrectionRequest,) => {
  const res = await api.post<ApiResponse<null>>(`/material-corrections/${batchId}`, request,);
  return res.data;
};

export const getMaterialCorrection = async (batchId: number) => {
  const res = await api.get<ApiResponse<MaterialCorrectionResponse[]>>(`/material-corrections/${batchId}`);
  return res.data;
};
