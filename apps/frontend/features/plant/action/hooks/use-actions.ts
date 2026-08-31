import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAction,
  deleteAction,
  getActionById,
  getActions,
  updateAction,
} from "../services/action.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetActions = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.actions.list(),
    queryFn: async () => {
      const res = await getActions();
      return res.data;
    },
    enabled,
  });
};

export const useGetActionById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.actions.detail(id ?? 0),
    queryFn: async () => {
      const res = await getActionById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAction,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.actions);
    },
  });
};

export const useCreateAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAction,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.actions);
    },
  });
};

export const useDeleteAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAction,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.actions);
    },
  });
};
