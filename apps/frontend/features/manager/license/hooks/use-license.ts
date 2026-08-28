import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { activateLicense, activateOfflineLicense, getLicense, validateLicense } from "../service/license.service";

export const queryKeys = {
    license: ["license"] as const,
};

export const useGetLicense = () => {
    return useQuery({
        queryKey: queryKeys.license,
        queryFn: async () => {
            const res = await getLicense();
            return res.data;
        }

    })
}

export const useValidateLicense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: validateLicense,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.license,
            });
        },
    });
};

export const useActivateLicense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateLicense,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.license,
            });
        },
    });
};

export const useActivateOfflineLicense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateOfflineLicense,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.license,
            });
        },
    });
};