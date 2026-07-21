
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createControlRecipe, deleteControlRecipe, getAllControlRecipes, getControlRecipeById, updateControlRecipe } from "../services/control-recipe.service";
import { queryKeys } from "../../common/hooks/query-keys";


export const useGetControlRecipes = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.controlRecipes,
        queryFn: async () => {
            const res = await getAllControlRecipes();
            return res.data;
        },
        enabled,
    });
};


export const useGetControlRecipeById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.controlRecipe(id) : [],
        queryFn: async () => {
            const res = await getControlRecipeById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useCreateControlRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createControlRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipes,
            });
        },
    });
};

export const useUpdateControlRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateControlRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipes
            });
        },
    });
};

export const useDeleteControlRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteControlRecipe,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipes
            });
        },
    });
};