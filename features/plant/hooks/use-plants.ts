import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlant, getPlantById, getPlants, updatePlant } from "../services/plant.service";


export const useGetPlants = () => {
    return useQuery({
        queryKey: ["plants"],
        queryFn: getPlants,
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
}

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