import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUnit, deleteUnit, getByAreaId, getUnitById, getUnits, updateUnit } from "../services/unit.service";
import { queryKeys } from "./query-keys";

export const useGetUnits = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.units,
        queryFn: async () => {
            const res = await getUnits();
            return res.data;
        },
        enabled
    })
}

export const useGetUnitById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.area(id) : [],
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
                queryKey: queryKeys.units,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
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
                queryKey: queryKeys.units,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
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
                queryKey: queryKeys.units,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
            });
        },

    });
};

export const useGetUnitsByAreaId = (areaId?: number) => {
    return useQuery({
        queryKey: areaId ? queryKeys.unitsByArea(areaId) : [],
        queryFn: async () => {
            const res = await getByAreaId(areaId!);
            return res.data;
        },
        enabled: !!areaId,
    });

};
