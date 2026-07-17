import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/hooks/query-keys";
import { createRole, deleteRole, getRoleById, updateRole, getAllRole } from "../services/role.service";

export const useGetRoles = () => {
    return useQuery({
        queryKey: queryKeys.roles,
        queryFn: async () => {
            const res = await getAllRole();
            return res.data;
        },
    });
}

export const useGetRolesById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.role(id) : [],
        queryFn: async () => {
            const res = await getRoleById(id!);
            return res.data;
        },
        enabled: !!id,
    })
}



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
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.roles,
            });
        },
    });
};