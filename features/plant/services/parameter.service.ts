import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { ParameterResponse } from "../types/parameter.types";


export const getParameters = async () => {
    const res = await api.get<ApiResponse<ParameterResponse[]>>("/parameters");
    return res.data;
};

export const getParameterById = async (id: number) => {
    const res = await api.get<ApiResponse<ParameterResponse>>(`/parameters/${id}`);
    return res.data;
};



