import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByMaterialAndStatus,
  updateRecipe,
} from "../services/recipe.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import { RecipeStatus } from "../types/recipe.types";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

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
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipes);
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipes);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipes);
    },
  });
};

export const useGetRecipesByMaterialAndStatus = (
  materialId?: number,
  status?: RecipeStatus,
) => {
  return useQuery({
    queryKey:
      materialId && status
        ? queryKeys.recipes.byMaterialAndStatus(materialId, status)
        : [],
    queryFn: async () => {
      const res = await getRecipesByMaterialAndStatus(materialId!, status!);
      return res.data;
    },
    enabled: !!materialId && !!status,
  });
};
