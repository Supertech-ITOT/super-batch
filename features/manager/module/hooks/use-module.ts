import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/hooks/query-keys";
import { getAllModules } from "../service/module.service";

export const useGetModules = () => {
    return useQuery({
        queryKey: queryKeys.modules,
        queryFn: async () => {
            const res = await getAllModules();
            return res.data;
        },
    });
}