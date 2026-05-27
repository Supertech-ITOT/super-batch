import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createArea, deleteArea, getAreaById, getAreas, getByPlantId, updateArea } from "../services/area.service"
import { queryKeys } from "./query-keys";


export const useGetAreas = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.areas,
        queryFn: async () => {
            const res = await getAreas();
            return res.data;
        },
        enabled
    })
}

export const useGetAreaById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.area(id) : [],
        queryFn: async () => {
            const res = await getAreaById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateArea,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.areas,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
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
                queryKey: queryKeys.areas,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
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
                queryKey: queryKeys.areas,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy,
            });
        },

    })
}

export const useGetAreasByPlantId = (plantId?: number) => {
    return useQuery({
        queryKey: plantId ? queryKeys.areasByPlant(plantId) : [],
        queryFn: async () => {
            const res = await getByPlantId(plantId!);
            return res.data;
        },
        enabled: !!plantId,
    });

};

