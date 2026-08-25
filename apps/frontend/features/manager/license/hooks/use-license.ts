import { useQuery } from "@tanstack/react-query"
import { getLicense } from "../service/license.service";

export const queryKeys = {
    license: ["license"] as const,
};

export const useGetLicense = () => {
    return useQuery({
        queryKey: queryKeys.license,
        queryFn: async () => {
            const res = await getLicense();
            return res.data;
        }

    })
}