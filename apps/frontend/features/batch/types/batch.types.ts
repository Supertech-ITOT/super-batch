export enum BatchStatus {
    TRANSFERRED = "TRANSFERRED",
    READY = "READY",
    IN_PROGRESS = "IN_PROGRESS",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
    ABORTED = "ABORTED",
}

export const BatchStatusBadgeStyles = {
    TRANSFERRED:
        "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",

    READY:
        "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",

    IN_PROGRESS:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",

    PAUSED:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",

    COMPLETED:
        "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

    ABORTED:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
} as const;

export type BatchAbortResponse = {
    batchId: number;
    batchNo: string;
    masterRecipeName: string;
    controlRecipeName: string;
    unitName: string;
    status: BatchStatus;
    startDateTime: string | null;
    currentStepNo: number | null;
};

export type AbortRequest = {
    stepNo: number;
    remark?: string;
};