import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { SetupRequest, SetupResponse } from "../types/service.typs";

export const getSetupStatus = async () => {
    const response = await api.get<ApiResponse<SetupResponse>>("/setup");
    return response.data;
};

export const setup = async (request: SetupRequest) => {
    const response = await api.post<ApiResponse<null>>("/setup", request);
    return response.data;
};