import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSetupStatus, setup } from "../service/service.service";
import { queryKeys } from "@/features/common/hooks/query-keys";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetSetupStatus = () => {
  return useQuery({
    queryKey: queryKeys.setups.all,
    queryFn: async () => {
      const res = await getSetupStatus();
      return res.data;
    },
    staleTime: Infinity,
  });
};

export const useSetup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setup,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.setups);
    },
  });
};
