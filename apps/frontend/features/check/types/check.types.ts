export interface BatchCheckResultRequest {
  checkParameterId: number;
  value: string;
}

export interface BatchCheckRequest {
  batchNo: string;
  stepNo: number;
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
  resultStatus: ResultStatus[];
}

export type ResultStatus = "PASS" | "FAIL";
