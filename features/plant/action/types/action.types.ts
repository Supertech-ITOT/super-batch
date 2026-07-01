
export interface ActionResponse {
    id: number;
    name: string;
}
export interface CreateActionRequest {
    name: string;
}
export interface UpdateActionRequest {
    name: string;
}

export const ActionType = {
  PRECHECKS: "Prechecks",
  DISCHARGE: "Discharge",
  OPERATOR_ACTION: "Operator Action",
  TRANSFER: "Transfer",
  TRANSFER_AND_RELEASE: "Transfer and Release",
  STIRRING: "Stirring",
} as const;