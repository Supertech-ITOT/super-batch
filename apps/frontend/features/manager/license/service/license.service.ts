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

export const activateLicense = async (licenseKey: string) => {
    const res = await api.post<ApiResponse<LicenseResponse>>("/license/activate", null, { params: { licenseKey, }, });
    return res.data;
};

export const activateOfflineLicense = async (licenseFile: File) => {
    const formData = new FormData();
    formData.append("licenseFile", licenseFile);
    const res = await api.post<ApiResponse<LicenseResponse>>("/license/activate-offline", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};