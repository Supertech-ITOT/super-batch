import { useQuery } from "@tanstack/react-query";
import { getPlantHierarchy } from "../services/plant-hierarchy.service";
import { queryKeys } from "@/features/common/hooks/query-keys";

export const usePlantHierarchy = () => {
  return useQuery({
    queryKey: queryKeys.plantHierarchy.all,
    queryFn: async () => {
      const res = await getPlantHierarchy();
      return res.data;
    },
  });
};
