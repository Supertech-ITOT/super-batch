import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "./query-keys"
import { createMessage, deleteMessage, getMessageById, getMessages, updateMessage } from "../services/messages.service"

export const useGetMessages = (enabled = true) => {
    return useQuery({
        queryKey: queryKeys.messages,
        queryFn: async () => {
            const res = await getMessages();
            return res.data;
        },
        enabled
    })
}

export const useGetMessageById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.message(id) : [],
        queryFn: async () => {
            const res = await getMessageById(id!);
            return res.data;
        },
        enabled: !!id,
    });
};

export const useUpdateMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMessage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },
    });
};

export const useCreateMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMessage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMessage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },

    })
}