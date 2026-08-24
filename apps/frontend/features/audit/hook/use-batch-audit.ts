import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BatchAuditSearchRequest } from "../types/audit.types";
import { getBatchAuditById, getBatchAudits } from "../service/batch-audit.service";

export const useGetBatchAudits = (request: BatchAuditSearchRequest) => {
  return useQuery({
    queryKey: ["batch-audits", request],
    queryFn: async () => {
      const res = await getBatchAudits(request);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};
export const useGetBatchAuditById = (id?: number) => {
  return useQuery({
    queryKey: ["batch-audit", id],
    queryFn: async () => {
      const res = await getBatchAuditById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};