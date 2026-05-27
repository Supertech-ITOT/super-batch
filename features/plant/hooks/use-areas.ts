import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createArea, deleteArea, getAreaById, getAreas, getByPlantId, updateArea } from "../services/area.service"


export const useGetAreas = (enabled = true) => {
    return useQuery({
        queryKey: ["areas"],
        queryFn: async () => {
            const res = await getAreas();
            return res.data;
        },
        enabled
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
                queryKey: ["areas-by-plantId", variables.data.plantId],
            });
            queryClient.invalidateQueries({
                queryKey: ["areas"],
            });
            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
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
                queryKey: ["areas"],
            });
            queryClient.invalidateQueries({
                queryKey: ["plant-by-id", variables.plantId],
            });
            queryClient.invalidateQueries({
                queryKey: ["areas-by-plantId", variables.plantId],
            });
            queryClient.invalidateQueries({
                queryKey: ["plant-hierarchy"],
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
                queryKey: ["plant-hierarchy"],
            });


        },

    })
}

export const useGetAreasByPlantId = (plantId?: number) => {
    return useQuery({
        queryKey: ["areas-by-plantId", plantId],
        queryFn: async () => {
            const res = await getByPlantId(plantId!);
            return res.data;
        },
        enabled: !!plantId,
    });

};

