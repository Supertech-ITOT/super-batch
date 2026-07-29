import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllBatchAudits } from "../service/batch-audit.service";
import { BatchAuditSearchRequest } from "../types/audit.types";

export const useGetBatchAudits = (
  request: BatchAuditSearchRequest
) => {
  return useQuery({
    queryKey: ["batch-audits", request],
    queryFn: async () => {
      const res = await getAllBatchAudits(request);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};