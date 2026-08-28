import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArea,
  deleteArea,
  getAreaById,
  getAreas,
  getByPlantId,
  updateArea,
} from "../services/area.service";
import { queryKeys } from "../../../common/hooks/query-keys";

export const useGetAreas = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.areas.list(),
    queryFn: async () => {
      const res = await getAreas();
      return res.data;
    },
    staleTime: 0,
    enabled,
  });
};

export const useGetAreaById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.areas.detail(id ?? 0),
    queryFn: async () => {
      const res = await getAreaById(id!);
      return res.data;
    },
    staleTime: 0,
    enabled: !!id,
  });
};

export const useUpdateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArea,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.areas.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.plantHierarchy.all,
      });
    },
  });
};

export const useCreateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArea,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.areas.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.plantHierarchy.all,
      });
    },
  });
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArea,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.areas.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.plantHierarchy.all,
      });
    },
  });
};

export const useGetAreasByPlantId = (plantId?: number) => {
  return useQuery({
    queryKey: queryKeys.areas.byPlant(plantId ?? 0),
    queryFn: async () => {
      const res = await getByPlantId(plantId!);
      return res.data;
    },
    staleTime: 0,
    enabled: !!plantId,
  });
};
