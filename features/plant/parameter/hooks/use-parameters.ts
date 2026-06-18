import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createParameter, deleteParameter, getParameterById, getParameters, updateParameter } from "../../parameter/services/parameter.service"
import { queryKeys } from "../../common/hooks/query-keys";


export const useGetParameters = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.parameters,
        queryFn: async () => {
            const res = await getParameters();
            return res.data;
        },
        enabled
    })
}

export const useGetParameterById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.parameter(id) : [],
        queryFn: async () => {
            const res = await getParameterById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateParameter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateParameter,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.parameters,
            });
        },
    });
};

export const useCreateParameter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createParameter,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.parameters,
            });
        },
    });
};

export const useDeleteParameter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteParameter,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.parameters,
            });
        },

    })
}



