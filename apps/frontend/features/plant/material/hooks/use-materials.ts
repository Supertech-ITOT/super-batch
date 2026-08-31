import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaterial,
  deleteMaterial,
  getMaterialById,
  getMaterials,
  updateMaterial,
} from "../../material/services/material.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetMaterials = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.materials.list(),
    queryFn: async () => {
      const res = await getMaterials();
      return res.data;
    },
    enabled,
  });
};

export const useGetMaterialById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.materials.detail(id ?? 0),
    queryFn: async () => {
      const res = await getMaterialById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMaterial,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.materials);
    },
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMaterial,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.materials);
    },
  });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMaterial,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.materials);
    },
  });
};
