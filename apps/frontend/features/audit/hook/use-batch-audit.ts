import { useQuery } from "@tanstack/react-query";
import { getAllBatchAudits } from "../service/batch-audit.service";

export const useGetBatchAudits = () => {
    return useQuery({
        queryKey: ["batch-audits"],
        queryFn: async () => {
            const res = await getAllBatchAudits();
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};