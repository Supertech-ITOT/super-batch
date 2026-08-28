import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createControlRecipe,
  deleteControlRecipe,
  getAllControlRecipes,
  getControlRecipeById,
  getRecipeEquipmentMapping,
  transferControlRecipe,
  updateControlRecipe,
} from "../services/control-recipe.service";
import { queryKeys } from "../../../common/hooks/query-keys";

export const useGetControlRecipes = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.controlRecipes.list(),
    queryFn: async () => {
      const res = await getAllControlRecipes();
      return res.data;
    },
    enabled,
  });
};

export const useRecipeEquipmentMapping = (
  recipeId?: number,
  unitId?: number,
) => {
  return useQuery({
    queryKey: queryKeys.controlRecipes.equipmentMapping(
      recipeId ?? 0,
      unitId ?? 0,
    ),
    queryFn: async () => {
      const res = await getRecipeEquipmentMapping(recipeId!, unitId!);
      return res.data;
    },
    enabled: !!recipeId && !!unitId,
  });
};

export const useGetControlRecipeById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.controlRecipes.detail(id ?? 0),
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
        queryKey: queryKeys.controlRecipes.all,
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
        queryKey: queryKeys.controlRecipes.all,
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
        queryKey: queryKeys.controlRecipes.all,
      });
    },
  });
};

export const useTransferControlRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferControlRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.controlRecipes.all,
      });
    },
  });
};
