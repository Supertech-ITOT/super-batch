import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransition,
  deleteTransition,
  getTransitionById,
  getTransitions,
  updateTransition,
} from "../services/transition.service";
import { queryKeys } from "../../../common/hooks/query-keys";

export const useGetTransitions = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.transitions.list(),
    queryFn: async () => {
      const res = await getTransitions();
      return res.data;
    },
    enabled,
  });
};

export const useGetTransitionById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.transitions.detail(id ?? 0),
    queryFn: async () => {
      const res = await getTransitionById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateTransition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransition,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transitions.all,
      });
    },
  });
};

export const useCreateTransition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransition,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transitions.all,
      });
    },
  });
};

export const useDeleteTransition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransition,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transitions.all,
      });
    },
  });
};
