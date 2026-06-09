import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTransition, deleteTransition, getTransitionById, getTransitions, updateTransition } from "../services/transition.service"
import { queryKeys } from "./query-keys";


export const useGetTransitions = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.transitions,
        queryFn: async () => {
            const res = await getTransitions();
            return res.data;
        },
        enabled
    })
}

export const useGetTransitionById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.transition(id) : [],
        queryFn: async () => {
            const res = await getTransitionById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateTransition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTransition,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.transitions,
            });
        },
    });
};

export const useCreateTransition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTransition,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.transitions,
            });
        },
    });
};

export const useDeleteTransition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTransition,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.transitions,
            });
        },

    })
}





