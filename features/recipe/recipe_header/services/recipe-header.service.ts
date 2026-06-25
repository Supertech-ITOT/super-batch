import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { CreateRecipeHeaderRequest, RecipeHeaderResponse, UpdateRecipeHeaderRequest } from "../types/recipe-header.types"

export const getAllRecipeHeaders = async () => {
    const res = await api.get<ApiResponse<RecipeHeaderResponse[]>>("/recipe-headers");
    return res.data;
}

export const getRecipeHeaderById = async (id: number) => {
    const res = await api.get<ApiResponse<RecipeHeaderResponse>>(`/recipe-headers/${id}`);
    return res.data;
}

export const createRecipeHeader = async (data: CreateRecipeHeaderRequest) => {
    const res = await api.post<ApiResponse<RecipeHeaderResponse>>("/recipe-headers", data);
    return res.data;
}

export const updateRecipeHeader = async ({ id, data }: { id: number, data: UpdateRecipeHeaderRequest }) => {
    const res = await api.put<ApiResponse<RecipeHeaderResponse>>(`/recipe-headers/${id}`, data);
    return res.data;
}

export const deleteRecipeHeader = async (id: number) => {
    const res = await api.delete<ApiResponse<void>>(`/recipe-headers/${id}`);
    return res.data;
}