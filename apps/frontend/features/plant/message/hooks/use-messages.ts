import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../common/hooks/query-keys";
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  updateMessage,
} from "../services/messages.service";
import {
  invalidateQueries,
  queryDeps,
} from "@/features/common/hooks/query-deps";

export const useGetMessages = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.messages.list(),
    queryFn: async () => {
      const res = await getMessages();
      return res.data;
    },
    enabled,
  });
};

export const useGetMessageById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.messages.detail(id ?? 0),
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
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.messages);
    },
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.messages);
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: async () => {
      await invalidateQueries(queryClient, queryDeps.messages);
    },
  });
};
