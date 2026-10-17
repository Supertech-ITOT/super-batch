import { ApiResponse } from "@/common/types/api.types";
import { BatchCheckRequest, BatchCheckResponse } from "../types/check.types";
import api from "@/common/lib/axios";

export const createBatchCheck = async (request: BatchCheckRequest) => {
  const res = await api.post<ApiResponse<null>>(`/batch-checks`, request);
  return res.data;
};

export const getBatchChecks = async ({ batchNo, stepNo }: { batchNo: string; stepNo: number }) => {
  const res = await api.get<ApiResponse<BatchCheckResponse[]>>(`/batch-checks`, { params: { batchNo, stepNo } });
  return res.data;
};
