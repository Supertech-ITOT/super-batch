import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { ActionResponse } from "../types/action.types";


export const getActions = async () => {
    const res = await api.get<ApiResponse<ActionResponse[]>>("/actions");
    return res.data;
};

export const getActionById = async (id: number) => {
    const res = await api.get<ApiResponse<ActionResponse>>(`/actions/${id}`);
    return res.data;
};



