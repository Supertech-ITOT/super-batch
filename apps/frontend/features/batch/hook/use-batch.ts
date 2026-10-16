import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invalidateQueries, queryDeps } from "@/features/common/hooks/query-deps";
import { abortBatch, getAbortDetails, getAllStepsById, getBatchInfo, getBatchProgress, getCurrentStepInfo } from "../service/batch.service";
import { queryKeys } from "@/features/common/hooks/query-keys";

export const useAbortBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: abortBatch,
        onSuccess: async () => {
            await invalidateQueries(queryClient, queryDeps.batches);
        },
    });
};

export const useGetAbortDetails = (batchId?: number) => {
    return useQuery({
        queryKey: queryKeys.batches.abortDetails(batchId ?? 0),
        queryFn: async () => {
            const res = await getAbortDetails(batchId!);
            return res.data;
        },
        staleTime: 0,
        enabled: !!batchId,
    });
};

export const useGetBatchInfo = (batchId?: number) => {
    return useQuery({
        queryKey: queryKeys.batches.info(batchId ?? 0),
        queryFn: async () => {
            const res = await getBatchInfo(batchId!);
            return res.data;
        },
        staleTime: 0,
        enabled: !!batchId,
    });
};

export const useGetBatchProgress = (batchId?: number) => {
    return useQuery({
        queryKey: queryKeys.batches.progress(batchId ?? 0),
        queryFn: async () => {
            const res = await getBatchProgress(batchId!);
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
        enabled: !!batchId,
    });
};

export const useGetCurrentStepInfo = (batchId?: number) => {
    return useQuery({
        queryKey: queryKeys.batches.currentStep(batchId ?? 0),
        queryFn: async () => {
            const res = await getCurrentStepInfo(batchId!);
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
        enabled: !!batchId,
    });
}

export const useGetAllStepInfo = (batchId?: number) => {
    return useQuery({
        queryKey: queryKeys.batches.allStepInfo(batchId ?? 0),
        queryFn: async () => {
            const res = await getAllStepsById(batchId!);
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
        enabled: !!batchId,
    });
}