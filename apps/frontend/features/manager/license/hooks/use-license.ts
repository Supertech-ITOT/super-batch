import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateLicense,
  activateOfflineLicense,
  getLicense,
  validateLicense,
} from "../service/license.service";
import { queryKeys } from "@/features/common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetLicense = () => {
  return useQuery({
    queryKey: queryKeys.license.all,
    queryFn: async () => {
      const res = await getLicense();
      return res.data;
    },
  });
};

export const useValidateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: validateLicense,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.license);
    },
  });
};

export const useActivateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateLicense,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.license);
    },
  });
};

export const useActivateOfflineLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateOfflineLicense,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.license);
    },
  });
};
