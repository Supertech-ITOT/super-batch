import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createPlant,
    deletePlant,
    getPlantById,
    getPlants,
    updatePlant,
} from "../services/plant.service";

// Query Keys
const plantKeys = {
    all: ["plants"] as const,
    detail: (id: number) => ["plant-by-id", id] as const,
    hierarchy: ["plant-hierarchy"] as const,
};

// Get all plants
export const useGetPlants = (enabled = true) => {
    return useQuery({
        queryKey: plantKeys.all,
        queryFn: async () => {
            const res = await getPlants();
            return res.data;
        },
        enabled,
    });
};

// Get plant by id
export const useGetPlantById = (id?: number) => {
    return useQuery({
        queryKey: id ? plantKeys.detail(id) : ["plant-by-id"],
        queryFn: async () => {
            const res = await getPlantById(id!);
            return res.data;
        },
        enabled: !!id,
        staleTime: 0,
    });
};

// Update plant
export const useUpdatePlant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePlant,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: plantKeys.detail(variables.id),
            });

            queryClient.invalidateQueries({
                queryKey: plantKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: plantKeys.hierarchy,
            });
        },
    });
};

// Create plant
export const useCreatePlant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPlant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: plantKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: plantKeys.hierarchy,
            });
        },
    });
};

// Delete plant
export const useDeletePlant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlant,
        onSuccess: (_, variables) => {
            queryClient.removeQueries({
                queryKey: plantKeys.detail(variables.id),
            });

            queryClient.invalidateQueries({
                queryKey: plantKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: plantKeys.hierarchy,
            });
        },
    });
};