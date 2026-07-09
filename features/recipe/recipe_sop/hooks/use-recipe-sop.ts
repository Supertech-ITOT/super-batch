import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipeSOP, updateRecipeSOP, deleteRecipeSOP, moveRecipeSOPUp, moveRecipeSOPDown, insertRecipeSOPAbove, insertRecipeSOPBelow, getRecipeSOPById, getRecipeSOPsByRecipeId } from "../service/recipe-sop.service";
import { queryKeys } from "../../common/hooks/query-keys";
import { CreateRecipeSOPRequest } from "../types/recipe-sop-types";

export const useGetRecipeSOPById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.recipeSop(id) : [],
        queryFn: async () => {
            const res = await getRecipeSOPById(id!);
            return res.data;
        },
        enabled: !!id,
    })
}
export const useGetRecipeSOPsByRecipeId = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.recipeSOPsByRecipe(id) : [],
        queryFn: async () => {
            const res = await getRecipeSOPsByRecipeId(id!);
            return res.data;
        },
        enabled: !!id,
    })
}

export const useCreateRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.recipeId),
            });
        },
    });
};

export const useUpdateRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.recipeId),
            });
        },
    });
};

export const useDeleteRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.recipeId),
            });
        },
    });
};

export const useMoveUpRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeSOPUp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.recipeId),
            });
        },
    });
};

export const useMoveDownRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeSOPDown,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.recipeId),
            });
        },
    });
};

export const useInsertAboveRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateRecipeSOPRequest; }) => insertRecipeSOPAbove(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.data.recipeId),
            });
        },
    });
};

export const useInsertBelowRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateRecipeSOPRequest; }) => insertRecipeSOPBelow(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipeSOPsByRecipe(variables.data.recipeId),
            });
        },
    });
};