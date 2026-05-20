import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createArea, deleteArea, getAreaById, getAreas, getByPlantId, updateArea } from "../services/area.service"


export const useGetAreas = () => {
    return useQuery({
        queryKey: ["areas"],
        queryFn: async () => {
            const res = await getAreas();
            return res.data;
        }
    })
}

export const useGetAreaById = (id?: number) => {
    return useQuery({
        queryKey: ["area-by-id", id],
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
                queryKey: ["area-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["areas"],
            });

            queryClient.invalidateQueries({
                queryKey: ["area-hierarchy"],
            });
        },
    });
};

export const useCreateArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createArea,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["areas"],
            });
            queryClient.invalidateQueries({
                queryKey: ["area-hierarchy"],
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
                queryKey: ["area-by-id", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["areas"],
            });

            queryClient.invalidateQueries({
                queryKey: ["area-hierarchy"],
            });


        },

    })
}

export const useGetByPlantId = (plantId?: number) => {
    return useQuery({
        queryKey: ["plant-by-id", plantId],
        queryFn: async () => {
            const res = await getByPlantId(plantId!);
            return res.data;
        },
        enabled: !!plantId,
    });

};

