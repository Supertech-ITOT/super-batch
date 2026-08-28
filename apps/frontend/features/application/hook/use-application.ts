import { useQuery } from "@tanstack/react-query";
import { getApplicationInfo } from "../service/application.service";
import { queryKeys } from "@/features/common/hooks/query-keys";

export const useGetApplicationInfo = () => {
  return useQuery({
    queryKey: queryKeys.applications.all,
    queryFn: async () => {
      const res = await getApplicationInfo();
      return res.data;
    },
  });
};
