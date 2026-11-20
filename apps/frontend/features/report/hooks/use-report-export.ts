import { queryKeys } from "@/features/common/hooks/query-keys";
import { ReportFilterRequest } from "../types/report.types";
import { useQuery } from "@tanstack/react-query";
import { generateBatchReport, generateProductionReport } from "../service/report-export.service";

export const useGenerateProductionReport = (request: ReportFilterRequest) => {
    return useQuery({
        queryKey: queryKeys.reportsExport.productionReport(request),
        queryFn: async () => {
            const res = await generateProductionReport(request);
            return res.data;
        },
        enabled: false,
        staleTime: 0,
    });
};

export const useGenerateBatchReport = (id: number) => {
    return useQuery({
        queryKey: queryKeys.reportsExport.batchReport(id),
        queryFn: async () => {
            const res = await generateBatchReport(id);
            return res.data;
        },
        enabled: false,
        staleTime: 0,
    });
};