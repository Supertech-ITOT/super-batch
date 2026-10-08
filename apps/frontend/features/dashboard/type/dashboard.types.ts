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

export const BatchStatusConfig: Record<
    BatchStatus,
    {
        label: string;
        icon: React.ElementType;
        iconClass: string;
        bgClass: string;
        glowClass: string;
    }
> = {
    [BatchStatus.TRANSFERRED]: {
        label: "Pending Workflow",
        icon: Play,
        iconClass: "text-cyan-600 dark:text-cyan-400",
        bgClass: "bg-cyan-50 dark:bg-cyan-950/40",
        glowClass: "bg-cyan-500/20",
    },

    [BatchStatus.READY]: {
        label: "Ready To Start",
        icon: Clock3,
        iconClass: "text-indigo-600 dark:text-indigo-400",
        bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
        glowClass: "bg-indigo-500/20",
    },

    [BatchStatus.IN_PROGRESS]: {
        label: "Active",
        icon: Play,
        iconClass: "text-green-600 dark:text-green-400",
        bgClass: "bg-green-50 dark:bg-green-950/40",
        glowClass: "bg-green-500/20",
    },

    [BatchStatus.PAUSED]: {
        label: "Paused",
        icon: CirclePause,
        iconClass: "text-yellow-600 dark:text-yellow-400",
        bgClass: "bg-yellow-50 dark:bg-yellow-950/40",
        glowClass: "bg-yellow-500/20",
    },

    [BatchStatus.COMPLETED]: {
        label: "Finished",
        icon: CheckCircle2,
        iconClass: "text-emerald-600 dark:text-emerald-400",
        bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
        glowClass: "bg-emerald-500/20",
    },

    [BatchStatus.ABORTED]: {
        label: "Aborted",
        icon: XCircle,
        iconClass: "text-red-600 dark:text-red-400",
        bgClass: "bg-red-50 dark:bg-red-950/40",
        glowClass: "bg-red-500/20",
    },
};


export type ProductionInsightsResponse = {
    period: {
        days: 7 | 30 | 90;
        startDate: string;
        endDate: string;
    };

    insights: {
        averageBatchCycleTime: {
            valueMinutes: number;
            changePercent: number;
            trend: number[];
        };

        batchSuccessRate: {
            valuePercent: number;
            changePercent: number;
            trend: number[];
        };

        processTimeEfficiency: {
            valuePercent: number;
            changePercent: number;
            trend: number[];
        };

        materialConsumptionAccuracy: {
            valuePercent: number;
            changePercent: number;
            trend: number[];
        };
    };
};

export type InsightPeriod = "SEVEN_DAYS" | "THIRTY_DAYS" | "NINETY_DAYS";

export const PERIODS: { value: InsightPeriod; label: string }[] = [
    { value: "SEVEN_DAYS", label: "7 Days" },
    { value: "THIRTY_DAYS", label: "30 Days" },
    { value: "NINETY_DAYS", label: "90 Days" },
];

export type BatchThroughputResponse = {
    period: {
        days: 7 | 30 | 90;
        startDate: string;
        endDate: string;
    };

    data: {
        date: string;
        completed: number;
        aborted: number;
    }[];
};




