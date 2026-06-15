import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { PermissionResponse } from "../types/permission.types"

export const getUserPermissions = async () => {
    const res = await api.get<ApiResponse<PermissionResponse>>("/permissions");
    return res.data;
}