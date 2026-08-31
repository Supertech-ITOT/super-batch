import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createParameter,
  deleteParameter,
  getParameterById,
  getParameters,
  updateParameter,
} from "../../parameter/services/parameter.service";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetParameters = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.parameters.list(),
    queryFn: async () => {
      const res = await getParameters();
      return res.data;
    },
    enabled,
  });
};

export const useGetParameterById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.parameters.detail(id ?? 0),
    queryFn: async () => {
      const res = await getParameterById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdateParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateParameter,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.parameters);
    },
  });
};

export const useCreateParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createParameter,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.parameters);
    },
  });
};

export const useDeleteParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteParameter,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.parameters);
    },
  });
};
