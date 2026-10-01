import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invalidateQueries, queryDeps } from "@/features/common/hooks/query-deps";
import { abortBatch, getAbortDetails } from "../service/batch.service";
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