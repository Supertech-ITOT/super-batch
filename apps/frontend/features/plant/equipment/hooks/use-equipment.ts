import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignEquipment,
  createEquipment,
  deleteEquipment,
  getByUnitId,
  getEquipmentById,
  getEquipments,
  unAssignEquipment,
  updateEquipment,
} from "../services/equipment.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetEquipment = () => {
  return useQuery({
    queryKey: queryKeys.equipments.list(),
    queryFn: async () => {
      const res = await getEquipments();
      return res.data;
    },
    staleTime: 0,
  });
};

export const useGetEquipmentById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.equipments.detail(id ?? 0),
    queryFn: async () => {
      const res = await getEquipmentById(id!);
      return res.data;
    },
    staleTime: 0,
    enabled: !!id,
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEquipment,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.equipments);
    },
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEquipment,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.equipments);
    },
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEquipment,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.equipments);
    },
  });
};

export const useGetEquipmentsByUnitId = (unitId?: number) => {
  return useQuery({
    queryKey: queryKeys.equipments.byUnit(unitId ?? 0),
    queryFn: async () => {
      const res = await getByUnitId(unitId!);
      return res.data;
    },
    enabled: !!unitId,
  });
};

export const useAssignEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.equipments.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.plantHierarchy.all,
      });
    },
  });
};

export const useUnAssignEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unAssignEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.equipments.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.plantHierarchy.all,
      });
    },
  });
};
