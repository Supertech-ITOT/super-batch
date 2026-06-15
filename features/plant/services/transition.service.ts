import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { CreateTransitionRequest, TransitionResponse, UpdateTransitionRequest } from "../types/transition.types";


export const getTransitions = async () => {
    const res = await api.get<ApiResponse<TransitionResponse[]>>("/transitions");
    return res.data;
};

export const getTransitionById = async (id: number) => {
    const res = await api.get<ApiResponse<TransitionResponse>>(`/transitions/${id}`);
    return res.data;
};

export const createTransition = async (data: CreateTransitionRequest) => {
    const res = await api.post<ApiResponse<null>>("/transitions", data);
    return res.data;
};

export const updateTransition = async ({ id, data }: { id: number, data: UpdateTransitionRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/transitions/${id}`, data);
    return res.data;
};

export const deleteTransition = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/transitions/${id}`);
    return res.data;
};



