import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getLicense, validateLicense } from "../service/license.service";

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