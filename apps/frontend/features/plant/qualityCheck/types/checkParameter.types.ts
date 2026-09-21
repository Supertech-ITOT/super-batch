export interface CheckParameterOption {
  id: number;
  value: string;
  isAllowed: boolean;
}

export interface CheckParameterResponse {
  id: number;
  name: string;
  product: string;
  type: CheckParameterType;
  min: number;
  max: number;
  options: CheckParameterOption[];
}

export interface CheckParameterRequest {
  name: string;
  product: string;
  type: CheckParameterType;
  min?: number;
  max?: number;
  allowedOptions?: string[];
  notAllowedOptions?: string[];
}

export enum CheckParameterType {
  QUANTITIVE = "QUANTITIVE",
  QUALITATIVE = "QUALITATIVE",
}

export const CheckParameterTypeBadgeStyles = {
  QUANTITIVE:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

  QUALITATIVE:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
} as const;
