import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    createRole,
    deleteRole,
    getAllRole,
    updateRole,
} from "../services/role.service";

import { RoleRequest } from "../types/role.types";
import { queryKeys } from "./query-keys";

export const useRoles = () =>
    useQuery({
        queryKey: queryKeys.roles,
        queryFn: getAllRole,
    });

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRole,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.roles,
            });
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.roles,
            });
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.roles,
            });
        },
    });
};