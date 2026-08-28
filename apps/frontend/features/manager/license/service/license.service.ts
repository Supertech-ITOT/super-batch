import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { LicenseResponse } from "../types/license.types"

export const getLicense = async () => {
    const res = await api.get<ApiResponse<LicenseResponse>>("/license");
    return res.data;
}


export const validateLicense = async () => {
    const res = await api.post<ApiResponse<boolean>>("/license/validate");
    return res.data;
};