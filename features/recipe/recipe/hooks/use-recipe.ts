import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createRecipe,updateRecipe,deleteRecipe,moveRecipeUp,moveRecipeDown,insertRecipeAbove,insertRecipeBelow,} from "../service/recipe.service";
import { queryKeys } from "../../recipe_header/hooks/query-keys";
import { CreateRecipeRequest } from "../types/recipe-types";

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useMoveUpRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeUp,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useMoveDownRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveRecipeDown,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useInsertAboveRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({mutationFn: ({id, data,}: {id: number;data: CreateRecipeRequest;}) => insertRecipeAbove(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};

export const useInsertBelowRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,data,}: {id: number;data: CreateRecipeRequest;}) => insertRecipeBelow(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.recipes,
            });
        },
    });
};