import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { BatchAuditResponse, BatchAuditSearchRequest, PageResponse, } from "../types/audit.types";

export const getBatchAudits = async (request: BatchAuditSearchRequest) => {
  const res = await api.post<ApiResponse<PageResponse<BatchAuditResponse>>>("/batch-audits", request);
  return res.data;
};

export const getBatchAuditById = async (id: number) => {
  const res = await api.get<ApiResponse<BatchAuditResponse>>(`/batch-audits/${id}`);
  return res.data;
};