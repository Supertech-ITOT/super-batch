import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invalidateQueries, queryDeps } from "@/features/common/hooks/query-deps";
import { queryKeys } from "@/features/common/hooks/query-keys";
import { createBatchCheck, getBatchChecks } from "../service/check.service";

export const useCreateBatchCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBatchCheck,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.batchChecks);
    },
  });
};

export const useGetBatchChecks = (batchNo?: string, stepNo?: number) => {
  return useQuery({
    queryKey: queryKeys.batchChecks.byBatchAndStep(batchNo ?? "", stepNo ?? 0),
    queryFn: async () => {
      const res = await getBatchChecks({
        batchNo: batchNo!,
        stepNo: stepNo!,
      });
      return res.data;
    },
    staleTime: 0,
    enabled: !!batchNo && !!stepNo,
  });
};
