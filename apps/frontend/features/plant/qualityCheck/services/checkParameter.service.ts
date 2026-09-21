import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import {
  CheckParameterRequest,
  CheckParameterResponse,
} from "../types/checkParameter.types";

export const getCheckParameters = async () => {
  const res =
    await api.get<ApiResponse<CheckParameterResponse[]>>("/check-parameters");
  return res.data;
};

export const getCheckParameterById = async (id: number) => {
  const res = await api.get<ApiResponse<CheckParameterResponse>>(
    `/check-parameters/${id}`,
  );
  return res.data;
};

export const createCheckParameter = async (data: CheckParameterRequest) => {
  const res = await api.post<ApiResponse<null>>("/check-parameters", data);
  return res.data;
};

export const updateCheckParameter = async ({
  id,
  data,
}: {
  id: number;
  data: CheckParameterRequest;
}) => {
  const res = await api.put<ApiResponse<null>>(`/check-parameters/${id}`, data);
  return res.data;
};

export const deleteCheckParameter = async ({
  id,
  currentUserId,
}: {
  id: number;
  currentUserId: number;
}) => {
  const res = await api.delete<ApiResponse<null>>(`/check-parameters/${id}`, {
    params: {
      currentUserId,
    },
  });

  return res.data;
};
