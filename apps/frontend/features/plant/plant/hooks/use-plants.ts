import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlant, deletePlant, getPlantById, getPlants, updatePlant } from "../../plant/services/plant.service";
import { queryKeys } from "../../common/hooks/query-keys";


export const useGetPlants = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.plants,
        queryFn: async () => {
            const res = await getPlants();
            return res.data;
        },
        staleTime: 0,
        enabled
    });
};

export const useGetPlantById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.plant(id) : [],
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
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.plants,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy
            });
        },
    });
};

export const useCreatePlant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPlant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.plants,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy
            });
        },
    });
};

export const useDeletePlant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePlant,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.plants,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.plantHierarchy
            });


        },

    })
}

