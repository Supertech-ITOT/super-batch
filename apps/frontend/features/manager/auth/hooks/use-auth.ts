import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "../services/auth.service";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      await invalidateQueries(queryClient, queryDeps.users);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("user");
    },
  });
};
