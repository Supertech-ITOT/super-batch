import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { createPlant, } from "../services/plant.service";

export const useCreatePlant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPlant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["plants"],
            });
        },
    });
};