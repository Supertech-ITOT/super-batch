import { useQuery } from "@tanstack/react-query"
import { getEquipmentTypes, getMaterialTypes, getUomTypes } from "../services/metadata.service"


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


export const useGetEquipmentTypes = (enabled = true) => {
    return useQuery({
        queryKey: ["equipment-types"],
        queryFn: async () => {
            const res = await getEquipmentTypes();
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