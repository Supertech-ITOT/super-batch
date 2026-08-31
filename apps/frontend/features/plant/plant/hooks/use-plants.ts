import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlant,
  deletePlant,
  getPlantById,
  getPlants,
  updatePlant,
} from "../../plant/services/plant.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetPlants = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.plants.list(),
    queryFn: async () => {
      const res = await getPlants();
      return res.data;
    },
    staleTime: 0,
    enabled,
  });
};

export const useGetPlantById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.plants.detail(id ?? 0),
    queryFn: async () => {
      const res = await getPlantById(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useUpdatePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlant,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.plants);
    },
  });
};

export const useCreatePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlant,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.plants);
    },
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlant,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.plants);
    },
  });
};
