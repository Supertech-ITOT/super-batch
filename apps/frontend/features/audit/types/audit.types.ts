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
  DELETED = "DELETED",
  RECIPE_RELEASED = "RECIPE_RELEASED",
  BATCH_TRANSFERED = "BATCH_TRANSFERED",
  BATCH_START = "BATCH_START",
  BATCH_STOP = "BATCH_STOP",
  BATCH_RESUME = "BATCH_RESUME",
  BATCH_PAUSE = "BATCH_PAUSE",
  BATCH_ABORT = "BATCH_ABORT",
  BATCH_COMPLETE = "BATCH_COMPLETE",
  BATCH_READY = "BATCH_READY",
}

export const ActionTypeBadgeStyles = {
  CREATED:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",

  UPDATED:
    "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300",

  DELETED:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300",

  RECIPE_RELEASED:
    "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-950/40 dark:text-purple-300",

  BATCH_TRANSFERED:
    "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",

  BATCH_START:
    "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/40 dark:text-green-300",

  BATCH_STOP:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-950/40 dark:text-orange-300",

  BATCH_RESUME:
    "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-300",

  BATCH_PAUSE:
    "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",

  BATCH_ABORT:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300",

  BATCH_COMPLETE:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",

  BATCH_READY:
    "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
} as const;