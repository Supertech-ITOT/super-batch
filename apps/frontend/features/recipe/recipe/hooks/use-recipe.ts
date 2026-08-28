import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../services/recipe.service";
import { queryKeys } from "../../../common/hooks/query-keys";

export const useGetRecipes = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.recipes.list(),
    queryFn: async () => {
      const res = await getAllRecipes();
      return res.data;
    },
    enabled,
  });
};

export const useGetRecipeById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.recipes.detail(id ?? 0),
    queryFn: async () => {
      const res = await getRecipeById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.recipes.all,
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
        queryKey: queryKeys.recipes.all,
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
        queryKey: queryKeys.recipes.all,
      });
    },
  });
};
