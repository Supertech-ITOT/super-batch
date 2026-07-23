import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/hooks/query-keys";
import { createControlRecipeSOP, deleteControlRecipeSOP, getControlRecipeSOPById, getControlRecipeSOPsByControlRecipeId, getSummaryByControlRecipeId, insertControlRecipeSOPAbove, insertControlRecipeSOPBelow, moveControlRecipeSOPDown, moveControlRecipeSOPUp, updateControlRecipeSOP } from "../service/control_recipe-sop.service";
import { CreateControlRecipeSOPRequest } from "../types/control_recipe-sop-types";

export const useGetControlRecipeSOPById = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.controlRecipeSOP(id) : [],
        queryFn: async () => {
            const res = await getControlRecipeSOPById(id!);
            return res.data;
        },
        enabled: !!id,
    })
}
export const useGetControlRecipeSOPsByControlRecipeId = (id?: number) => {
    return useQuery({
        queryKey: id ? queryKeys.controlRecipeSOPsByControlRecipe(id) : [],
        queryFn: async () => {
            const res = await getControlRecipeSOPsByControlRecipeId(id!);
            return res.data;
        },
        enabled: !!id,
    })
}

export const useCreateControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createControlRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.controlRecipeId),
            });
        },
    });
};

export const useUpdateControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateControlRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.controlRecipeId),
            });
        },
    });
};

export const useDeleteControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteControlRecipeSOP,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.controlRecipeId),
            });
        },
    });
};

export const useMoveUpControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveControlRecipeSOPUp,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.controlRecipeId),
            });
        },
    });
};

export const useMoveDownControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: moveControlRecipeSOPDown,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.controlRecipeId),
            });
        },
    });
};

export const useInsertAboveControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateControlRecipeSOPRequest; }) => insertControlRecipeSOPAbove(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.data.controlRecipeId),
            });
        },
    });
};

export const useInsertBelowControlRecipeSOP = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: CreateControlRecipeSOPRequest; }) => insertControlRecipeSOPBelow(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.controlRecipeSOPsByControlRecipe(variables.data.controlRecipeId),
            });
        },
    });
};

export const useGetSummaryByControlRecipeId = (controlRecipeId: number) => {
    return useQuery({
        queryKey: queryKeys.controlRecipeSOPsSummaryByControlRecipe(controlRecipeId),
        queryFn: async () => {
            const res = await getSummaryByControlRecipeId(controlRecipeId);
            return res.data;
        },
        enabled: !!controlRecipeId,
    });
};


