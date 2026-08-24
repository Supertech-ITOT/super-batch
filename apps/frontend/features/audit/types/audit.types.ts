export interface BatchAuditResponse {
  id: number;
  action: string;
  module: string;
  performedBy: BatchAuditUserResponse;
  performedAt: string;
  oldData: string;
  newData: string;
  entity: string;

}

export interface BatchAuditUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface BatchAuditSearchRequest {
  search: string | null;
  moduleId: number | null;
  action: string | null;
  userId: number | null;
  fromDate: string | null;
  toDate: string | null;
  page: number;
  size: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export enum ActionType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED"
}

export const ActionTypeBadgeStyles = {
  CREATED:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  UPDATED:
    "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  DELETED:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300",
} as const;