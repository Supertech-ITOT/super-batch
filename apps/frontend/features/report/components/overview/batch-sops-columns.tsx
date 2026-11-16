import { ColumnDef } from "@tanstack/react-table";
import { BatchSopResponse } from "../../types/report.types";
import { format } from "date-fns";
import { minutesToADuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { BatchSOPStatusBadgeStyles } from "@/features/batch/types/batch.types";
import { toDisplayText } from "@/common/lib/format-enum";
import { getColorByText } from "@/common/utils/color.util";

export const batchSopsColumns: ColumnDef<BatchSopResponse>[] = [
  {
    accessorKey: "stepNo",
    header: "Step No.",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const { message, remark } = row.original;

      return (
        <div className="flex max-w-xs flex-col whitespace-normal">
          <span className="line-clamp-2 wrap-break-word" title={message}>
            {message || "-"}
          </span>

          {remark?.trim() && (
            <span className="line-clamp-2 text-muted-foreground" title={remark}>
              Remark: {remark}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "transition",
    header: "Transition",
    cell: ({ row }) => (
      <Badge variant="outline" className={`${getColorByText(row.original.transition)} text-[10px] sm:text-xs`}>
        {row.original.transition}
      </Badge>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <Badge variant="outline" className={`${getColorByText(row.original.action)} text-[10px] sm:text-xs`}>
        {row.original.action}
      </Badge>
    ),
  },
  {
    accessorKey: "fromEquipment",
    header: "From Equipment",
    cell: ({ row }) => row.original.fromEquipment ?? "-",
    meta: { align: "center" },
  },
  {
    accessorKey: "toEquipment",
    header: "To Equipment",
    cell: ({ row }) => row.original.toEquipment ?? "-",
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
    accessorKey: "status",
    header: "Status",
    size: 110,
    meta: { align: "center" },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant="outline" className={`${BatchSOPStatusBadgeStyles[status as keyof typeof BatchSOPStatusBadgeStyles]} text-[10px] sm:text-xs`}>
          {toDisplayText(status)}
        </Badge>
      );
    },
  },
];

export default batchSopsColumns;
