import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSetupStatus, setup } from "../service/service.service";

export const useGetSetupStatus = () => {
    return useQuery({
        queryKey: ["setup-status"],
        queryFn: async () => {
            const res = await getSetupStatus();
            return res.data;
        },
        staleTime: Infinity,
    });
};

export const useSetup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: setup,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["setup-status"],
            });
        },
    });
};