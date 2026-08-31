import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUnit,
  deleteUnit,
  getByAreaId,
  getUnitById,
  getUnits,
  updateUnit,
} from "../../unit/services/unit.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetUnits = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.units.list(),
    queryFn: async () => {
      const res = await getUnits();
      return res.data;
    },
    staleTime: 0,
    enabled,
  });
};

export const useGetUnitById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.units.detail(id ?? 0),
    queryFn: async () => {
      const res = await getUnitById(id!);
      return res.data;
    },
    staleTime: 0,
    enabled: !!id,
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUnit,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.units);
    },
  });
};

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUnit,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.units);
    },
  });
};

export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.units);
    },
  });
};

export const useGetUnitsByAreaId = (areaId?: number) => {
  return useQuery({
    queryKey: queryKeys.units.byArea(areaId ?? 0),
    queryFn: async () => {
      const res = await getByAreaId(areaId!);
      return res.data;
    },
    enabled: !!areaId,
  });
};
