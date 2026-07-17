import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../common/hooks/query-keys";
import { getUserPermissions } from "../services/permission.service";

export const useGetUserPermissions = () => {
    return useQuery({
        queryKey: queryKeys.permissions,
        queryFn: async () => {
            const res = await getUserPermissions();
            return res.data;
        },
        staleTime: 1000 * 60 * 30, // 30 min
    });

}