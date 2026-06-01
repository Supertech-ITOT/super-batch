import { useQuery } from "@tanstack/react-query"
import { getTransitionById, getTransitions } from "../services/transition.service"
import { queryKeys } from "./query-keys";


export const useGetTransitions = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.transitions,
        queryFn: async () => {
            const res = await getTransitions();
            return res.data;
        },
        enabled
    })
}

export const useGetTransitionById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.transition(id) : [],
        queryFn: async () => {
            const res = await getTransitionById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};




