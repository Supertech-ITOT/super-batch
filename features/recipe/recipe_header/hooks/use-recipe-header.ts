
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipeHeader, deleteRecipeHeader, getAllRecipeHeaders, getRecipeHeaderById, updateRecipeHeader } from "../services/recipe-header.service";
import { queryKeys } from "./query-keys";


export const useGetRecipeHeaders = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.recipeHeaders,
        queryFn: async () => {
            const res = await getAllRecipeHeaders();
            return res.data;
        },
        staleTime: 0,
        enabled,
    });
};


export const useGetRecipeHeaderById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.recipeHeader(id) : [],
        queryFn: async () => {
            const res = await getRecipeHeaderById(id!);
            return res.data;
        },
        staleTime: 0,
        enabled: !!id,
    });
};

export const useCreateRecipeHeader = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecipeHeader,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeHeaders,
            });
        },
    });
};

export const useUpdateRecipeHeader = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipeHeader,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeHeaders
            });
        },
    });
};

export const useDeleteRecipeHeader = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRecipeHeader,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeHeaders
            });
        },
    });
};