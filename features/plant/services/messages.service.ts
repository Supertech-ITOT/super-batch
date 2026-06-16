import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { CreateMessagesRequest, MessagesResponse, UpdateMessagesRequest } from "../types/messages.types";


export const getMessages = async () => {
    const res = await api.get<ApiResponse<MessagesResponse[]>>("/messages");
    return res.data;
};

export const createMessages = async (data: CreateMessagesRequest) => {
    const res = await api.post<ApiResponse<null>>("/messages", data);
    return res.data;
};

export const updateMessages = async ({ id, data }: { id: number, data: UpdateMessagesRequest }) => {
    const res = await api.put<ApiResponse<null>>(`/messages/${id}`, data);
    return res.data;
};

export const deleteMessages = async ({ id }: { id: number }) => {
    const res = await api.delete<ApiResponse<null>>(`/messages/${id}`);
    return res.data;
};
