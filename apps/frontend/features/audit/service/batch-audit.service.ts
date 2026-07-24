import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { BatchAuditResponse } from "../types/audit.types"

export const getAllBatchAudits = async()=>{
    const res = await api.get<ApiResponse<BatchAuditResponse[]>>("/batch-audits");
    return res.data;
}