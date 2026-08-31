import { useQuery } from "@tanstack/react-query";
import {
  getBatchAuditAction,
  getMaterialTypes,
  getRecipeStatusTypes,
  getUomTypes,
} from "../services/metadata.service";
import { queryKeys } from "./query-keys";

export const useGetUomTypes = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.metadata.uomTypes(),
    queryFn: async () => {
      const res = await getUomTypes();
      return res.data;
    },
    enabled,
  });
};

export const useGetMaterialTypes = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.metadata.materialTypes(),
    queryFn: async () => {
      const res = await getMaterialTypes();
      return res.data;
    },
    enabled,
  });
};

export const useGetBatchAuditAction = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.metadata.batchAuditActions(),
    queryFn: async () => {
      const res = await getBatchAuditAction();
      return res.data;
    },
    enabled,
  });
};

export const useGetRecipeStatusTypes = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.metadata.recipeStatusTypes(),
    queryFn: async () => {
      const res = await getRecipeStatusTypes();
      return res.data;
    },
    enabled,
  });
};
