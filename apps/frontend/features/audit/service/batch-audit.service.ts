import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import {
  BatchAuditResponse,
  BatchAuditSearchRequest,
  PageResponse,
} from "../types/audit.types";

export const getAllBatchAudits = async (
  request: BatchAuditSearchRequest
) => {
  const res = await api.post<ApiResponse<PageResponse<BatchAuditResponse>>>(
    "/batch-audits/search",
    request
  );

  return res.data;
};