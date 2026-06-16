import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUnitConnection, deleteUnitConnection, getUnitConnectionById, getUnitConnections, updateUnitConnection, } from "../services/unit-connection.service";
import { queryKeys } from "./query-keys";

export const useGetUnitConnections = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.unitConnections,
        queryFn: async () => {
            const res = await getUnitConnections();
            return res.data;
        },
        enabled,
    });
};

export const useGetUnitConnectionById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.unitConnection(id) : [],
        queryFn: async () => {
            const res = await getUnitConnectionById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useCreateUnitConnection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUnitConnection,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.unitConnections,
            });
        },
    });
};

export const useUpdateUnitConnection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUnitConnection,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.unitConnections,
            });
        },
    });
};

export const useDeleteUnitConnection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUnitConnection,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.unitConnections,
            });
        },
    });
};