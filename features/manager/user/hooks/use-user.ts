import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "../../common/hooks/query-keys"
import { createUser, deleteUser, getAllUsers, getCurrentUser, getUserById, updateUser } from "../services/user.service"

export const useGetUser = () => {
    return useQuery({
        queryKey: queryKeys.users,
        queryFn: async () => {
            const res = await getAllUsers();
            return res.data;
        },
    });
}

export const useGetUsersById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.user(id) : [],
        queryFn: async () => {
            const res = await getUserById(id!);
            return res.data;
        },
        enabled: !!id,
    })
}
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: async () => {
            const res = await getCurrentUser();
            return res.data;
        }
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
};