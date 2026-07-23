import api from "@/common/lib/axios";
import { CreateControlRecipeSOPRequest, UpdateControlRecipeSOPRequest, ControlRecipeSOPResponse, ControlRecipeSOPSummary, } from "../types/control_recipe-sop-types";
import { ApiResponse } from "@/common/types/api.types";

export const getControlRecipeSOPById = async (id: number) => {
  const res = await api.get<ApiResponse<ControlRecipeSOPResponse>>(`/control-recipe-sop/${id}`);
  return res.data;
};

export const getControlRecipeSOPsByControlRecipeId = async (id: number) => {
  const res = await api.get<ApiResponse<ControlRecipeSOPResponse[]>>(`/control-recipe-sop/recipe/${id}`);
  return res.data;
};

export const createControlRecipeSOP = async (data: CreateControlRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<ControlRecipeSOPResponse>>("/control-recipe-sop", data);
  return res.data;
};

export const updateControlRecipeSOP = async (data: UpdateControlRecipeSOPRequest) => {
  const res = await api.put<ApiResponse<ControlRecipeSOPResponse>>("/control-recipe-sop", data);
  return res.data;
};

export const deleteControlRecipeSOP = async ({ id, controlRecipeId }: { id: number; controlRecipeId: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/control-recipe-sop/${id}`);
  return res.data;
};

export const moveControlRecipeSOPUp = async ({ id, controlRecipeId }: { id: number; controlRecipeId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/control-recipe-sop/${id}/move-up`);
  return res.data;
};

export const moveControlRecipeSOPDown = async ({ id, controlRecipeId }: { id: number; controlRecipeId: number }) => {
  const res = await api.patch<ApiResponse<void>>(`/control-recipe-sop/${id}/move-down`);
  return res.data;
};

export const insertControlRecipeSOPAbove = async (id: number, data: CreateControlRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<ControlRecipeSOPResponse>>(`/control-recipe-sop/${id}/insert-above`, data);
  return res.data;
};

export const insertControlRecipeSOPBelow = async (id: number, data: CreateControlRecipeSOPRequest) => {
  const res = await api.post<ApiResponse<ControlRecipeSOPResponse>>(`/control-recipe-sop/${id}/insert-below`, data);
  return res.data;
};

export const getSummaryByControlRecipeId = async (controlRecipeId: number) => {
  const res = await api.get<ApiResponse<ControlRecipeSOPSummary>>(`/control-recipe-sop/summary/${controlRecipeId}`);
  return res.data;
};