import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, updateRecipe, deleteRecipe, moveRecipeUp, moveRecipeDown, insertRecipeAbove, insertRecipeBelow, getRecipeById, getRecipesByHeaderId, } from "../service/recipe.service";
import { queryKeys } from "../../recipe_header/hooks/query-keys";
import { CreateRecipeRequest } from "../types/recipe-types";

export const useGetRecipeById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.recipe(id) : [],
        queryFn: async () => {
            const res = await getRecipeById(id!);
            return res.data;
        },
        enabled: !!id,
    })
}
export const useGetRecipeByHeaderId = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.recipesByHeader(id) : [],
        queryFn: async () => {
            const res = await getRecipesByHeaderId(id!);
            return res.data;
        },
        enabled: !!id,
    })
}

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.recipeHeaderId),
            });
        },
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.recipeHeaderId),
            });
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.recipeHeaderId),
            });
        },
    });
};

export const useMoveUpRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeUp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.recipeHeaderId),
            });
        },
    });
};

export const useMoveDownRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeDown,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.recipeHeaderId),
            });
        },
    });
};

export const useInsertAboveRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateRecipeRequest; }) => insertRecipeAbove(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.data.recipeHeaderId),
            });
        },
    });
};

export const useInsertBelowRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateRecipeRequest; }) => insertRecipeBelow(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipesByHeader(variables.data.recipeHeaderId),
            });
        },
    });
};