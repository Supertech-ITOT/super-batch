import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { CreateRecipeRequest, RecipeResponse, UpdateRecipeRequest } from "../types/recipe.types"

export const getAllRecipes = async () => {
    const res = await api.get<ApiResponse<RecipeResponse[]>>("/recipe");
    return res.data;
}

export const getRecipeById = async (id: number) => {
    const res = await api.get<ApiResponse<RecipeResponse>>(`/recipe/${id}`);
    return res.data;
}

export const createRecipe = async (data: CreateRecipeRequest) => {
    const res = await api.post<ApiResponse<RecipeResponse>>("/recipe", data);
    return res.data;
}

export const updateRecipe = async ({ id, data }: { id: number, data: UpdateRecipeRequest }) => {
    const res = await api.put<ApiResponse<RecipeResponse>>(`/recipe/${id}`, data);
    return res.data;
}

export const deleteRecipe = async (id: number) => {
    const res = await api.delete<ApiResponse<void>>(`/recipe/${id}`);
    return res.data;
}