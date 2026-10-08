import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { ActiveBatchResponse, BatchStatusDashboardResponse, BatchThroughputResponse, InsightPeriod, ProductionInsightsResponse, ScheduledBatchResponse } from "../type/dashboard.types";

export const getBatchStatus = async () => {
    const res = await api.get<ApiResponse<BatchStatusDashboardResponse>>(`/dashboard/status`);
    return res.data;
};

export const getActiveBatch = async () => {
    const res = await api.get<ApiResponse<ActiveBatchResponse[]>>(`/dashboard/active-batches`);
    return res.data;
};

export const getScheduledBatch = async () => {
    const res = await api.get<ApiResponse<ScheduledBatchResponse[]>>(`/dashboard/scheduled-batches`);
    return res.data;
};

export const getProductionInsights = async (period: InsightPeriod = "SEVEN_DAYS") => {
    const res = await api.get<ApiResponse<ProductionInsightsResponse>>(`/dashboard/production-insight`, { params: { period, }, });
    return res.data;
};

export const getBatchThroughput = async (period: InsightPeriod = "SEVEN_DAYS") => {
    const res = await api.get<ApiResponse<BatchThroughputResponse>>(`/dashboard/batch-throughput`, { params: { period }, });
    return res.data;
};