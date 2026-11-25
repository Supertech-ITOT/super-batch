import { ApiResponse } from "@/common/types/api.types";
import { BatchesResponse, BatchReportResponse, ReportFilterRequest, ReportMetadataResponse } from "../types/report.types";
import api from "@/common/lib/axios";

export const generateProductionReport = async (request: ReportFilterRequest) => {
    const res = await api.post<ApiResponse<BatchesResponse[]>>("/reports/export/production-report", request);
    return res.data;
};
export const generateBatchReport = async (id: number) => {
    const res = await api.get<ApiResponse<BatchReportResponse>>(`/reports/export/batch-report/${id}`);
    return res.data;
};

export const getMetadata = async () => {
    const res = await api.get<ApiResponse<ReportMetadataResponse>>("/reports/export/metadata");
    return res.data;
};