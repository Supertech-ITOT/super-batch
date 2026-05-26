import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlant, deletePlant, getPlantById, getPlants, updatePlant } from "../services/plant.service";


export const useGetPlants = (enabled = true) => {
    return useQuery({
        queryKey: ["plants"],
        queryFn: async () => {
            const res = await getPlants();
            return res.data;
        },
        enabled
    });
};

export const useGetPlantById = (id?: number) => {
    return useQuery({
        queryKey: ["plant-by-id", id],
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
                queryKey: ["plant-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["plants"],
            });

            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
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
                queryKey: ["plants"],
            });
            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
            });
        },
    });
};

export const useDeletePlant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePlant,
        onSuccess: (_, variables) => {
            queryClient.removeQueries({
                queryKey: ["plant-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["plants"],
            });

            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
            });


        },

    })
}