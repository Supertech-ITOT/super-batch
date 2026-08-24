import { useQuery } from "@tanstack/react-query";
import { getApplicationInfo } from "../service/application.service";

export const useGetApplicationInfo = () => {
    return useQuery({
        queryKey: ["application-info"],
        queryFn: async () => {
            const res = await getApplicationInfo();
            return res.data;
        },
    });
};