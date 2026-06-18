import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { ActionResponse, CreateActionRequest, UpdateActionRequest } from "../../action/types/action.types";


export const getActions = async () => {
    const res = await api.get<ApiResponse<ActionResponse[]>>("/actions");
    return res.data;
};

export const getActionById = async (id: number) => {
    const res = await api.get<ApiResponse<ActionResponse>>(`/actions/${id}`);
    return res.data;
};

export const createAction = async (data: CreateActionRequest) => {
    const res = await api.post<ApiResponse<null>>("/actions", data);
    return res.data;
};

export const updateAction = async ({ id, data }: { id: number, data: UpdateActionRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/actions/${id}`, data);
    return res.data;
};

export const deleteAction = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/actions/${id}`);
    return res.data;
};


