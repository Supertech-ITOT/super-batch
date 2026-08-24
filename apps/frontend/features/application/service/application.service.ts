import { ApiResponse } from "@/common/types/api.types";
import { ApplicationInfoResponse } from "../types/application.types";
import api from "@/common/lib/axios";

export const getApplicationInfo = async () => {
    const res = await api.get<ApiResponse<ApplicationInfoResponse>>("application/info");
    return res.data;
};