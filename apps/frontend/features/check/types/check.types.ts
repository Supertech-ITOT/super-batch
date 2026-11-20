export interface BatchCheckResultRequest {
  checkParameterId: number;
  value: string;
}

export interface BatchCheckRequest {
  results: BatchCheckResultRequest[];
}

export interface BatchCheckResponse {
  id: number;
  batchNo: string;
  stepNo: number;
  sampleDateTime: string;
  checkParameterName: string;
  value: string;
  loop: number;
  resultStatus: ResultStatus;
}


export type MaterialCorrectionRequest = {
  materialId: number;
  qty: number;
}

export type MaterialCorrectionResponse = {
  id: number;
  batchNo: string;
  stepNo: number;
  sampleDateTime: string;
  loop: number;
  materialId: number;
  materialName: string;
  materialCode: string;
  qty: number;
}

export enum ResultStatus {
  PASS = "PASS",
  FAIL = "FAIL",
}

export const ResultStatusBadgeStyles = {
  PASS: "bg-primary text-white border-primary",
  FAIL: "bg-destructive text-white border-destructive",
} as const;