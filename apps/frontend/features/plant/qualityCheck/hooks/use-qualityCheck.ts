import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";
import {
  createCheckParameter,
  deleteCheckParameter,
  getCheckParameterById,
  getCheckParameters,
  updateCheckParameter,
} from "../services/checkParameter.service";
import { queryKeys } from "@/features/common/hooks/query-keys";

export const useGetCheckParameters = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.checkParameters.list(),
    queryFn: async () => {
      const res = await getCheckParameters();
      return res.data;
    },

    enabled,
  });
};

export const useGetCheckParameterById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.checkParameters.detail(id ?? 0),
    queryFn: async () => {
      const res = await getCheckParameterById(id!);
      return res.data;
    },

    enabled: !!id,
  });
};

export const useUpdateCheckParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCheckParameter,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.checkParameters);
    },
  });
};

export const useCreateCheckParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCheckParameter,

    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.checkParameters);
    },
  });
};

export const useDeleteCheckParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCheckParameter,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.checkParameters);
    },
  });
};
