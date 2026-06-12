import { useQuery } from "@tanstack/react-query"
import { getMaterialTypes, getUomTypes } from "../services/metadata.service"


export const useGetUomTypes = (enabled = true) => {
    return useQuery({
        queryKey: ["uom-types"],
        queryFn: async () => {
            const res = await getUomTypes();
            return res.data;
        },
        enabled
    })
}

export const useGetMaterialTypes = (enabled = true) => {
    return useQuery({
        queryKey: ["material-types"],
        queryFn: async () => {
            const res = await getMaterialTypes();
            return res.data;
        },
        enabled
    })
}