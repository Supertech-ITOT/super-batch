import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRecipeSOP,
  updateRecipeSOP,
  deleteRecipeSOP,
  moveRecipeSOPUp,
  moveRecipeSOPDown,
  insertRecipeSOPAbove,
  insertRecipeSOPBelow,
  getRecipeSOPById,
  getRecipeSOPsByRecipeId,
  getSummaryByRecipeId,
} from "../service/recipe-sop.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import { CreateRecipeSOPRequest } from "../types/recipe-sop-types";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetRecipeSOPById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.recipeSOPs.detail(id ?? 0),
    queryFn: async () => {
      const res = await getRecipeSOPById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useGetRecipeSOPsByRecipeId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.recipeSOPs.byRecipe(id ?? 0),
    queryFn: async () => {
      const res = await getRecipeSOPsByRecipeId(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useUpdateRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useDeleteRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useMoveUpRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveRecipeSOPUp,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useMoveDownRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveRecipeSOPDown,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useInsertAboveRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateRecipeSOPRequest }) =>
      insertRecipeSOPAbove(id, data),
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useInsertBelowRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateRecipeSOPRequest }) =>
      insertRecipeSOPBelow(id, data),
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.recipeSOPs);
    },
  });
};

export const useGetSummaryByRecipeId = (recipeId: number) => {
  return useQuery({
    queryKey: queryKeys.recipeSOPs.summaryByRecipe(recipeId ?? 0),
    queryFn: async () => {
      const res = await getSummaryByRecipeId(recipeId);
      return res.data;
    },
    enabled: !!recipeId,
  });
};
