import { useQuery } from "@tanstack/react-query"
import { getActionById, getActions } from "../services/action.service"
import { queryKeys } from "./query-keys";


export const useGetActions = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.actions,
        queryFn: async () => {
            const res = await getActions();
            return res.data;
        },
        enabled
    })
}

export const useGetActionById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.action(id) : [],
        queryFn: async () => {
            const res = await getActionById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};




