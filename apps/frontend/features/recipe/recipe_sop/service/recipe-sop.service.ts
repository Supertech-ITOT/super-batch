import api from "@/common/lib/axios";
import {
  CreateRecipeSOPRequest,
  UpdateRecipeSOPRequest,
  RecipeSOPResponse,
  RecipeSOPSummary,
} from "../types/recipe-sop-types";
import { ApiResponse } from "@/common/types/api.types";

export const getRecipeSOPById = async (id: number) => {
  const res = await api.get<ApiResponse<RecipeSOPResponse>>(`/recipe-sop/${id}`);
  return res.data;
};

export const getRecipeSOPsByRecipeId = async (id: number) => {
  const res = await api.get<ApiResponse<RecipeSOPResponse[]>>(
    `/recipe-sop/recipe/${id}`
  );
  return res.data;
};

export const createRecipeSOP = async (data: CreateRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<RecipeSOPResponse>>("/recipe-sop", data);
  return res.data;
};

export const updateRecipeSOP = async (data: UpdateRecipeSOPRequest) => {
  const res = await api.put<ApiResponse<RecipeSOPResponse>>("/recipe-sop", data);
  return res.data;
};

export const deleteRecipeSOP = async ({ id, recipeId }: { id: number; recipeId: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/recipe-sop/${id}`);
  return res.data;
};

export const moveRecipeSOPUp = async ({ id, recipeId }: { id: number; recipeId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/recipe-sop/${id}/move-up`);
  return res.data;
};

export const moveRecipeSOPDown = async ({ id, recipeId }: { id: number; recipeId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/recipe-sop/${id}/move-down`);
  return res.data;
};

export const insertRecipeSOPAbove = async (id: number, data: CreateRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<RecipeSOPResponse>>(`/recipe-sop/${id}/insert-above`, data);
  return res.data;
};

export const insertRecipeSOPBelow = async (id: number, data: CreateRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<RecipeSOPResponse>>(`/recipe-sop/${id}/insert-below`, data);
  return res.data;
};

export const getSummaryByRecipeId = async (recipeId: number) => {
  const res = await api.get<ApiResponse<RecipeSOPSummary>>(
    `/recipe-sop/summary/${recipeId}`
  );
  return res.data;
};