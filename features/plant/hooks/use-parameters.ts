import { useQuery } from "@tanstack/react-query"
import { getParameterById, getParameters } from "../services/parameter.service"
import { queryKeys } from "./query-keys";


export const useGetParameters = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.parameters,
        queryFn: async () => {
            const res = await getParameters();
            return res.data;
        },
        enabled
    })
}

export const useGetParameterById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.parameter(id) : [],
        queryFn: async () => {
            const res = await getParameterById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};




