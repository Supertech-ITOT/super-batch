import api from "@/lib/axios"
import { ApiResponse } from "@/types/api.types"
import { OptionResponse } from "../types/metadata.types"

export const getEquipmentTypes = async () => {
    const res = await api.get<ApiResponse<OptionResponse[]>>("/metadata/equipment-types");
    return res.data;
}

export const getUnitTypes = async () => {
    const res = await api.get<ApiResponse<OptionResponse[]>>("/metadata/unit-types");
    return res.data;
}