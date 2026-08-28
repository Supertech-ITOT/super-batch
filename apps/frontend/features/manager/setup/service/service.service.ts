import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { SetupResponse } from "../types/service.typs";

export const getSetupStatus = async () => {
    const response = await api.get<ApiResponse<SetupResponse>>("/setup");
    return response.data;
};

export const setup = async (request: FormData) => {
    const response = await api.post<ApiResponse<null>>("/setup", request,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};