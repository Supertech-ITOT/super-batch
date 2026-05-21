import { useQuery } from "@tanstack/react-query"
import { getEquipmentTypes, getUnitTypes } from "../services/metadata.service"

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

export const useGetUnitTypes = (enabled = true) => {
    return useQuery({
        queryKey: ["unit-types"],
        queryFn: async () => {
            const res = await getUnitTypes();
            return res.data;
        },
        enabled
    })
}