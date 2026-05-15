import { useQuery } from "@tanstack/react-query"
import { getPlantHierarchy } from "../services/plant-hierarchy.service";

export const usePlantHierarchy = () => {
    return useQuery({
        queryKey: ["plant-hierarchy"],
        queryFn: async () => {
            const res = await getPlantHierarchy();
            return res.data;
        },
    });
}