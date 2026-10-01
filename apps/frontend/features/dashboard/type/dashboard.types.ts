import { BatchStatus } from "@/features/batch/types/batch.types";
import { CheckCircle2, CirclePause, Clock3, Play, XCircle } from "lucide-react";

export type BatchStatusCardResponse = {
    status: BatchStatus;
    count: number;
};

export type BatchStatusDashboardResponse = {
    totalBatches: number;
    statuses: BatchStatusCardResponse[];
};

export type ActiveBatchResponse = {
    batchId: number;
    batchNo: string;
    product: string;
    unit: string;
    status: BatchStatus;
    startedAt: string;
    cycleTime: number;
    stdTime: number;
    progress: number;
}
export type ScheduledBatchResponse = {
    batchNo: string;
    batchSize: number
    product: string;
    unit: string;
    scheduledAt: string;
}

export const BatchStatusConfig: Record<BatchStatus, { label: string; icon: React.ElementType; iconClass: string; bgClass: string }> = {
    [BatchStatus.TRANSFERRED]: { label: "Pending Workflow", icon: Play, iconClass: "text-cyan-600 dark:text-cyan-400", bgClass: "bg-cyan-50 dark:bg-cyan-950/40" },
    [BatchStatus.READY]: { label: "Ready To Start", icon: Clock3, iconClass: "text-indigo-600 dark:text-indigo-400", bgClass: "bg-indigo-50 dark:bg-indigo-950/40" },
    [BatchStatus.IN_PROGRESS]: { label: "Active", icon: Play, iconClass: "text-green-600 dark:text-green-400", bgClass: "bg-green-50 dark:bg-green-950/40" },
    [BatchStatus.PAUSED]: { label: "Paused", icon: CirclePause, iconClass: "text-yellow-600 dark:text-yellow-400", bgClass: "bg-yellow-50 dark:bg-yellow-950/40" },
    [BatchStatus.COMPLETED]: { label: "Finished", icon: CheckCircle2, iconClass: "text-emerald-600 dark:text-emerald-400", bgClass: "bg-emerald-50 dark:bg-emerald-950/40" },
    [BatchStatus.ABORTED]: { label: "Aborted", icon: XCircle, iconClass: "text-red-600 dark:text-red-400", bgClass: "bg-red-50 dark:bg-red-950/40" },
};