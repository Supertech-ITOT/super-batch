import { useQuery } from "@tanstack/react-query"
import { getPlantHierarchy } from "../services/plant-hierarchy.service";
import { queryKeys } from "./query-keys";

export const usePlantHierarchy = () => {
    return useQuery({
        queryKey: queryKeys.plantHierarchy,
        queryFn: async () => {
            const res = await getPlantHierarchy();
            return res.data;
        },
    });
}