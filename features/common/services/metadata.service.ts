import api from "@/common/lib/axios"
import { ApiResponse } from "@/common/types/api.types"
import { OptionResponse } from "../types/metadata.types"

export const getUomTypes = async () => {
    const res = await api.get<ApiResponse<OptionResponse[]>>("/metadata/uom-types");
    return res.data;
}


export const getEquipmentTypes = async () => {
    const res = await api.get<ApiResponse<OptionResponse[]>>("/metadata/equipment-types");
    return res.data;
}

export const getMaterialTypes = async () => {
    const res = await api.get<ApiResponse<OptionResponse[]>>("/metadata/material-types");
    return res.data;
}
