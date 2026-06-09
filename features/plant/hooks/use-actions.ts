import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAction, deleteAction, getActionById, getActions, updateAction } from "../services/action.service"
import { queryKeys } from "./query-keys";


export const useGetActions = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.actions,
        queryFn: async () => {
            const res = await getActions();
            return res.data;
        },
        enabled
    })
}

export const useGetActionById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.action(id) : [],
        queryFn: async () => {
            const res = await getActionById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};




export const useUpdateAction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAction,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.actions,
            });
        },
    });
};

export const useCreateAction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAction,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.actions,
            });
        },
    });
};

export const useDeleteAction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAction,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.actions,
            });
        },

    })
}
