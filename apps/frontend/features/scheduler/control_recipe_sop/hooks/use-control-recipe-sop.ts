import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  createControlRecipeSOP,
  deleteControlRecipeSOP,
  getControlRecipeSOPById,
  getControlRecipeSOPsByControlRecipeId,
  getSummaryByControlRecipeId,
  insertControlRecipeSOPAbove,
  insertControlRecipeSOPBelow,
  moveControlRecipeSOPDown,
  moveControlRecipeSOPUp,
  updateControlRecipeSOP,
} from "../service/control_recipe-sop.service";
import { CreateControlRecipeSOPRequest } from "../types/control_recipe-sop-types";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetControlRecipeSOPById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.controlRecipeSOPs.detail(id) : [],
    queryFn: async () => {
      const res = await getControlRecipeSOPById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useGetControlRecipeSOPsByControlRecipeId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.controlRecipeSOPs.byControlRecipe(id ?? 0),
    queryFn: async () => {
      const res = await getControlRecipeSOPsByControlRecipeId(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createControlRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useUpdateControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateControlRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useDeleteControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteControlRecipeSOP,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useMoveUpControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveControlRecipeSOPUp,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useMoveDownControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveControlRecipeSOPDown,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useInsertAboveControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateControlRecipeSOPRequest;
    }) => insertControlRecipeSOPAbove(id, data),
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useInsertBelowControlRecipeSOP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateControlRecipeSOPRequest;
    }) => insertControlRecipeSOPBelow(id, data),
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.controlRecipeSOPs);
    },
  });
};

export const useGetSummaryByControlRecipeId = (controlRecipeId: number) => {
  return useQuery({
    queryKey: queryKeys.controlRecipeSOPs.summaryByControlRecipe(
      controlRecipeId ?? 0,
    ),
    queryFn: async () => {
      const res = await getSummaryByControlRecipeId(controlRecipeId);
      return res.data;
    },
    enabled: !!controlRecipeId,
  });
};
