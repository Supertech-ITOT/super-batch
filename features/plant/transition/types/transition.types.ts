
export interface TransitionResponse {
    id: number;
    name: string;
}


export interface CreateTransitionRequest {
    name: string;
}
export interface UpdateTransitionRequest {
    name: string;
}

export const TransitionType = {
    MANUAL_CONFIRMATION: "Manual Confirmation",
    AUTO_MATERIAL_CHARGE: "Auto Material Charge",
    MANUAL_MATERIAL_CHARGE: "Manual Material Charge",
    TIME: "Time",
    EVENT: "Event",
    SAMPLE_CHECK: "Sample Check",
    TRANSFER: "Transfer",
    RELEASE_EQUIPMENT: "Release Equipment",
} as const;