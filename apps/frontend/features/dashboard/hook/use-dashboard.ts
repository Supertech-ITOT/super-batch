import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/features/common/hooks/query-keys";
import { getActiveBatch, getBatchStatus, getProductionInsights, getScheduledBatch } from "../service/dashboard.service";
import { InsightPeriod } from "../type/dashboard.types";

export const useGetBatchStatus = () => {
    return useQuery({
        queryKey: queryKeys.dashboard.status(),
        queryFn: async () => {
            const res = await getBatchStatus();
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
};

export const useGetActiveBatch = () => {
    return useQuery({
        queryKey: queryKeys.dashboard.activeBatch(),
        queryFn: async () => {
            const res = await getActiveBatch();
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
};

export const useGetScheduledBatch = () => {
    return useQuery({
        queryKey: queryKeys.dashboard.scheduledBatch(),
        queryFn: async () => {
            const res = await getScheduledBatch();
            return res.data;
        },
        refetchInterval: 10 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
};

export const useGetProductionInsights = (period: InsightPeriod = "SEVEN_DAYS") => {
    return useQuery({
        queryKey: queryKeys.dashboard.productionInsights(period),
        queryFn: async () => {
            const res = await getProductionInsights(period);
            return res.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
};