import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEquipment, deleteEquipment, getByUnitId, getEquipmentById, getEquipments, updateEquipment } from "../services/equipment.service";
import { queryKeys } from "./query-keys";

export const useGetEquipment = () => {
    return useQuery({
        queryKey: queryKeys.equipments,
        queryFn: async () => {
            const res = await getEquipments();
            return res.data;
        },
        staleTime: 0,
    });
};

export const useGetEquipmentById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.equipment(id) : [],
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
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.equipments,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
            });
        },
    });
};

export const useCreateEquipment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEquipment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.equipments,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
            });
        },
    });
};

export const useDeleteEquipment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEquipment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.equipments,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
            });


        },

    });
};

export const useGetEquipmentsByUnitId = (unitId?: number) => {
    return useQuery({
        queryKey: unitId ? queryKeys.equipmentsByUnit(unitId) : [],
        queryFn: async () => {
            const res = await getByUnitId(unitId!);
            return res.data;
        },
        staleTime: 0,
        enabled: !!unitId,
    });

};

