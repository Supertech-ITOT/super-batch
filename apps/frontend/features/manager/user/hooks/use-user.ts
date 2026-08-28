import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  changePassword,
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  resetFirstPassword,
  resetPassword,
  updateUser,
} from "../services/user.service";

export const useGetUser = () => {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: async () => {
      const res = await getAllUsers();
      return res.data;
    },
  });
};

export const useGetUsersById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id ?? 0),
    queryFn: async () => {
      const res = await getUserById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useGetCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.current(),
    queryFn: async () => {
      const res = await getCurrentUser();
      return res.data;
    },
    enabled,
    retry: false,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
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
        queryKey: queryKeys.users.all,
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
        queryKey: queryKeys.users.all,
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useResetFirstPassword = () => {
  return useMutation({
    mutationFn: resetFirstPassword,
    onSuccess: () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        user.passwordChangeRequired = false;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
      });
    },
  });
};
