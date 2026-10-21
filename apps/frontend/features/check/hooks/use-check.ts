import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invalidateQueries, queryDeps } from "@/features/common/hooks/query-deps";
import { queryKeys } from "@/features/common/hooks/query-keys";
import { createBatchCheck, createMaterialCorrection, getBatchChecks, getMaterialCorrection } from "../service/check.service";
import { BatchCheckRequest, MaterialCorrectionRequest } from "../types/check.types";

export const useCreateBatchCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, request, }: {
      batchId: number;
      request: BatchCheckRequest;
    }) => createBatchCheck(batchId, request),

    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.batchChecks);
    },
  });
};

export const useGetBatchChecks = (batchId: number) => {
  return useQuery({
    queryKey: queryKeys.batchChecks.byBatchId(batchId ?? 0),
    queryFn: async () => {
      const res = await getBatchChecks(batchId);
      return res.data;
    },
    staleTime: 0,
  });
};


export const useCreateMaterialCorrection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, request, }: {
      batchId: number;
      request: MaterialCorrectionRequest;
    }) => createMaterialCorrection(batchId, request),

    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.materialCorrection);
    },
  });
};

export const useGetMaterialCorrection = (batchId: number) => {
  return useQuery({
    queryKey: queryKeys.materialCorrection.byBatchId(batchId ?? 0),
    queryFn: async () => {
      const res = await getMaterialCorrection(batchId);
      return res.data;
    },
    staleTime: 0,
  });
};
