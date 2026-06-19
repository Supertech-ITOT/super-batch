import api from "@/common/lib/axios";
import { ModuleResponse } from "../types/module.types";
import { ApiResponse } from "@/common/types/api.types";

export const getAllModules = async () => {
    const res = await api.get<ApiResponse<ModuleResponse[]>>("/modules");
    return res.data;
};
