import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { CreateMessageRequest, MessageResponse, UpdateMessageRequest } from "../types/messages.types";


export const getMessages = async () => {
    const res = await api.get<ApiResponse<MessageResponse[]>>("/messages");
    return res.data;
};

export const getMessageById = async (id: number) => {
    const res = await api.get<ApiResponse<MessageResponse>>(`/messages/${id}`);
    return res.data;
};

export const createMessage = async (data: CreateMessageRequest) => {
    const res = await api.post<ApiResponse<null>>("/messages", data);
    return res.data;
};

export const updateMessage = async ({ id, data }: { id: number, data: UpdateMessageRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/messages/${id}`, data);
    return res.data;
};

export const deleteMessage = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/messages/${id}`);
    return res.data;
};
