import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { CreateControlRecipeRequest, ControlRecipeResponse, UpdateControlRecipeRequest } from "../types/control-recipe.types"

export const getAllControlRecipes = async () => {
    const res = await api.get<ApiResponse<ControlRecipeResponse[]>>("/control-recipe");
    return res.data;
}

export const getControlRecipeById = async (id: number) => {
    const res = await api.get<ApiResponse<ControlRecipeResponse>>(`/control-recipe/${id}`);
    return res.data;
}

export const createControlRecipe = async (data: CreateControlRecipeRequest) => {
    const res = await api.post<ApiResponse<ControlRecipeResponse>>("/control-recipe", data);
    return res.data;
}

export const updateControlRecipe = async ({ id, data }: { id: number, data: UpdateControlRecipeRequest }) => {
    const res = await api.put<ApiResponse<ControlRecipeResponse>>(`/control-recipe/${id}`, data);
    return res.data;
}

export const deleteControlRecipe = async (id: number) => {
    const res = await api.delete<ApiResponse<void>>(`/control-recipe/${id}`);
    return res.data;
}