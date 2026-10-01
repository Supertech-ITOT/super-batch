import api from "@/common/lib/axios";
import { ApiResponse } from "@/common/types/api.types";
import { AbortRequest, BatchAbortResponse } from "../types/batch.types";

export const abortBatch = async ({ batchNo, request, }: { batchNo: string; request: AbortRequest; }) => {
    const res = await api.post<ApiResponse<null>>(`/batches/${batchNo}/abort`, request,);
    return res.data;
};

export const getAbortDetails = async (batchId: number) => {
    const res = await api.get<ApiResponse<BatchAbortResponse>>(`/batches/${batchId}/abort-details`,);
    return res.data;
};