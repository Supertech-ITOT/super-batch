import { useQuery } from "@tanstack/react-query"
import { getEquipmentTypes, getUnitTypes } from "../services/metadata.service"

export const useGetEquipmentTypes = () => {
    return useQuery({
        queryKey: ["equipment-types"],
        queryFn: async () => {
            const res = await getEquipmentTypes();
            return res.data;
        }
    })
}

export const useGetUnitTypes = () => {
    return useQuery({
        queryKey: ["unit-types"],
        queryFn: async () => {
            const res = await getUnitTypes();
            return res.data;
        }
    })
}