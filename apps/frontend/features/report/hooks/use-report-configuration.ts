import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/features/common/hooks/query-keys";
import { invalidateQueries, queryDeps } from "@/features/common/hooks/query-deps";
import { getCompanyLogo, uploadCompanyLogo, deleteCompanyLogo, } from "../service/report-configuration.service";

export const useGetCompanyLogo = () => {
    return useQuery({
        queryKey: queryKeys.reportsConfiguration.logo(),
        queryFn: async () => {
            const res = await getCompanyLogo();
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useUploadCompanyLogo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadCompanyLogo,
        onSuccess: async () => {
            await invalidateQueries(queryClient, queryDeps.reportsConfiguration);
        },
    });
};

export const useDeleteCompanyLogo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompanyLogo,
        onSuccess: async () => {
            await invalidateQueries(queryClient, queryDeps.reportsConfiguration);
        },
    });
};