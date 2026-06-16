import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "./query-keys"
import { createMessages, deleteMessages, getMessages, updateMessages } from "../services/messages.service"

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

export const useUpdateMessages = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMessages,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },
    });
};

export const useCreateMessages = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMessages,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },
    });
};

export const useDeleteMessages = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMessages,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.messages,
            });
        },

    })
}