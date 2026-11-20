import { ColumnDef } from "@tanstack/react-table";
import { BatchesResponse } from "../types/report.types";
import { format } from "date-fns";
import { minutesToADuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { BatchStatusBadgeStyles } from "@/features/batch/types/batch.types";
import { toDisplayText } from "@/common/lib/format-enum";

export const batchListColumns: ColumnDef<BatchesResponse>[] = [
  {
    accessorKey: "batchNo",
    header: "BatchNo",
    meta: {
      align: "left",
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => row.original.unit.code,
    meta: { align: "center" },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => row.original.product.code,
    meta: { align: "center" },
  },
  {
    accessorKey: "startDateTime",
    header: "Start Date Time",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.startDateTime;
      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }
      return format(new Date(value), "dd MMM yyyy hh:mm a");
    },
  },
  {
    accessorKey: "endDateTime",
    header: "End Date Time",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.endDateTime;
      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }
      return format(new Date(value), "dd MMM yyyy hh:mm a");
    },
  },
  {
    accessorKey: "standardTime",
    header: "Standard Time",
    cell: ({ row }) => minutesToADuration(row.original.standardTime),
    meta: { align: "center" },
  },
  {
    accessorKey: "actualTime",
    header: "Actual Time",
    cell: ({ row }) => minutesToADuration(row.original.actualTime),
    meta: { align: "center" },
  },
  {
    accessorKey: "varianceTime",
    header: "Variance Time",
    cell: ({ row }) => {
      const variance = row.original.varianceTime;
      if (variance == null) return "-";
      const isFaster = variance < 0;
      const isDelayed = variance > 0;
      return (
        <span
          className={isFaster ? "text-primary font-semibold" : isDelayed ? "text-destructive font-semibold" : "text-muted-foreground font-medium"}
        >
          {minutesToADuration(variance)}
        </span>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "standardSize",
    header: "Standard Size",
    cell: ({ row }) => `${row.original.standardSize.toFixed(2)} KG`,
    meta: { align: "center" },
  },
  {
    accessorKey: "actualSize",
    header: "Actual Size",
    cell: ({ row }) => `${row.original.actualSize.toFixed(2)} KG`,
    meta: { align: "center" },
  },
  {
    accessorKey: "varianceSize",
    header: "Variance Size",
    cell: ({ row }) => {
      const variance = row.original.varianceSize;

      return (
        <span
          className={
            variance > 0 ? "text-primary font-semibold" : variance < 0 ? "text-destructive font-semibold" : "text-muted-foreground font-medium"
          }
        >
          {variance > 0 ? "+" : ""}
          {variance.toFixed(2)} KG
        </span>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "completionPercentage",
    header: "Step Completion",
    size: 180,
    enableSorting: true,
    cell: ({ row }) => {
      const { completedSteps, totalSteps, completionPercentage } = row.original;
      const percentage = Math.min(100, Math.max(0, completionPercentage));
      const progressColor = percentage === 100 ? "bg-primary" : percentage >= 50 ? "bg-yellow-500" : "bg-destructive";
      const textColor = percentage === 100 ? "text-primary" : percentage >= 50 ? "text-yellow-600" : "text-destructive";
      return (
        <div className="w-full min-w-35 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {completedSteps}/{totalSteps} Steps
            </span>
            <span className={`font-semibold ${textColor}`}>{percentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all duration-300 ${progressColor}`} style={{ width: `${percentage}%` }} />
          </div>
        </div>
      );
    },
    meta: { align: "center" },
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 110,
    meta: { align: "center" },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant="outline" className={BatchStatusBadgeStyles[status as keyof typeof BatchStatusBadgeStyles]}>
          {toDisplayText(status)}
        </Badge>
      );
    },
  },
];

export default batchListColumns;
