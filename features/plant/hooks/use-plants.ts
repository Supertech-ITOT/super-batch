import { useQuery } from "@tanstack/react-query";
import { getPlants } from "../services/plant.service";


export const usePlants = () => {
    return useQuery({
        queryKey: ["plants"],
        queryFn: getPlants,
    });
};