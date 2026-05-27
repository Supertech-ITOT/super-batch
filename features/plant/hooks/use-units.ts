import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUnit, deleteUnit, getByAreaId, getUnitById, getUnits, updateUnit } from "../services/unit.service";

export const useGetUnits = (enabled = true) => {
    return useQuery({
        queryKey: ["units"],
        queryFn: async () => {
            const res = await getUnits();
            return res.data;
        },
        enabled
    })
}

export const useGetUnitById = (id?: number) => {
    return useQuery({
        queryKey: ["unit-by-id", id],
        queryFn: async () => {
            const res = await getUnitById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateUnit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUnit,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["unit-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["units"],
            });

            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
            });
        },
    });
};

export const useCreateUnit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUnit,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["units"],
            });
            queryClient.invalidateQueries({
                queryKey: ["area-by-id", variables.areaId],
            });
            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
            });
        },
    });
};

export const useDeleteUnit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUnit,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["unit-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["units"],
            });

            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
            });


        },

    });
};

export const useGetUnitsByAreaId = (areaId?: number) => {
    return useQuery({
        queryKey: ["units-by-areaId", areaId],
        queryFn: async () => {
            const res = await getByAreaId(areaId!);
            return res.data;
        },
        enabled: !!areaId,
    });

};
