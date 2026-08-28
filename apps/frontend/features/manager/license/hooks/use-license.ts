import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLicense, validateLicense } from "../service/license.service";
import { queryKeys } from "@/features/common/hooks/query-keys";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.license.all,
      });
    },
  });
};
