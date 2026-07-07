import api from "@/common/lib/axios";
import {
  CreateRecipeRequest,
  UpdateRecipeRequest,
  RecipeResponse,
} from "../types/recipe-types";
import { ApiResponse } from "@/common/types/api.types";

export const getRecipeById = async (id: number) => {
  const res = await api.get<ApiResponse<RecipeResponse>>(`/recipe/${id}`);
  return res.data;
};

export const getRecipesByHeaderId = async (recipeHeaderId: number) => {
  const res = await api.get<ApiResponse<RecipeResponse[]>>(
    `/recipe/header/${recipeHeaderId}`
  );
  return res.data;
};

export const createRecipe = async (data: CreateRecipeRequest) => {
  const res = await api.post<ApiResponse<RecipeResponse>>("/recipe", data);
  return res.data;
};

export const updateRecipe = async (data: UpdateRecipeRequest) => {
  const res = await api.put<ApiResponse<RecipeResponse>>("/recipe", data);
  return res.data;
};

export const deleteRecipe = async ({ id, recipeHeaderId }: { id: number; recipeHeaderId: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/recipe/${id}`);
  return res.data;
};

export const moveRecipeUp = async ({ id, recipeHeaderId }: { id: number; recipeHeaderId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/recipe/${id}/move-up`);
  return res.data;
};

export const moveRecipeDown = async ({ id, recipeHeaderId }: { id: number; recipeHeaderId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/recipe/${id}/move-down`);
  return res.data;
};

export const insertRecipeAbove = async (id: number, data: CreateRecipeRequest) => {
  const res = await api.post<ApiResponse<RecipeResponse>>(`/recipe/${id}/insert-above`, data);
  return res.data;
};

export const insertRecipeBelow = async (id: number, data: CreateRecipeRequest) => {
  const res = await api.post<ApiResponse<RecipeResponse>>(`/recipe/${id}/insert-below`, data);
  return res.data;
};