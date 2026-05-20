import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEquipment, deleteEquipment, getByUnitId, getEquipmentById, getEquipments, updateEquipment } from "../services/equipment.service";

export const useGetEquipment = () => {
    return useQuery({
        queryKey: ["equipments"],
        queryFn: async () => {
            const res = await getEquipments();
            return res.data;
        },
    });
};

export const useGetEquipmentById = (id?: number) => {
    return useQuery({
        queryKey: ["Equipment-by-id", id],
        queryFn: async () => {
            const res = await getEquipmentById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateEquipment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateEquipment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["equipment-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["equipments"],
            });

            queryClient.invalidateQueries({
                queryKey: ["equipment-hierarchy"],
            });
        },
    });
};

export const useCreateEquipment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEquipment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["equipments"],
            });
            queryClient.invalidateQueries({
                queryKey: ["equipment-hierarchy"],
            });
        },
    });
};

export const useDeleteEquipment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEquipment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["equipment-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["equipments"],
            });

            queryClient.invalidateQueries({
                queryKey: ["equipment-hierarchy"],
            });


        },

    });
};

export const useGetByUnitId = (unitId?: number) => {
    return useQuery({
        queryKey: ["unit-by-id", unitId],
        queryFn: async () => {
            const res = await getByUnitId(unitId!);
            return res.data;
        },
        enabled: !!unitId,
    });

};

