import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { TransitionResponse } from "../types/transition.types";


export const getTransitions = async () => {
    const res = await api.get<ApiResponse<TransitionResponse[]>>("/transitions");
    return res.data;
};

export const getTransitionById = async (id: number) => {
    const res = await api.get<ApiResponse<TransitionResponse>>(`/transitions/${id}`);
    return res.data;
};



