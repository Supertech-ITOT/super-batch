import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { CreateParameterRequest, ParameterResponse, UpdateParameterRequest } from "../types/parameter.types";


export const getParameters = async () => {
    const res = await api.get<ApiResponse<ParameterResponse[]>>("/parameters");
    return res.data;
};

export const getParameterById = async (id: number) => {
    const res = await api.get<ApiResponse<ParameterResponse>>(`/parameters/${id}`);
    return res.data;
};

export const createParameter = async (data: CreateParameterRequest) => {
    const res = await api.post<ApiResponse<null>>("/parameters", data);
    return res.data;
};

export const updateParameter = async ({ id, data }: { id: number, data: UpdateParameterRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/parameters/${id}`, data);
    return res.data;
};

export const deleteParameter = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/parameters/${id}`);
    return res.data;
};


