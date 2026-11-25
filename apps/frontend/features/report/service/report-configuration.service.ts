import { ApiResponse } from "@/common/types/api.types";
import api from "@/common/lib/axios";

export const getCompanyLogo = async () => {
    const res = await api.get<ApiResponse<string>>("/reports/configuration/logo");
    return res.data;
};

export const uploadCompanyLogo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.put<ApiResponse<null>>(
        "/reports/configuration/logo",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

export const deleteCompanyLogo = async () => {
    const res = await api.delete<ApiResponse<null>>("/reports/configuration/logo");
    return res.data;
};