import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ActiveBatchResponse } from "../type/dashboard.types";
import { formatMinutes } from "@/common/lib/formatMinutes";
import { ProgressValue } from "@/common/components/progress-value";
import { Badge } from "@/common/components/ui/badge";
import { toDisplayText } from "@/common/lib/format-enum";
import { BatchStatusBadgeStyles } from "@/features/batch/types/batch.types";

export const activeBatchColumns: ColumnDef<ActiveBatchResponse>[] = [
  {
    accessorKey: "batchNo",
    header: "Batch No.",
    size: 100,
    meta: { align: "center" },
  },
  {
    accessorKey: "product",
    header: "Product",
    size: 180,
    meta: { align: "center" },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    size: 100,
    meta: { align: "center" },
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    size: 120,
    meta: { align: "center" },
    cell: ({ row }) => <span className="whitespace-nowrap">{format(new Date(row.original.startedAt), "dd MMM yyyy hh:mm a")}</span>,
  },
  {
    accessorKey: "cycleTime",
    header: "Cycle Time",
    size: 100,
    meta: { align: "center" },
    cell: ({ row }) => <span className="whitespace-nowrap font-medium">{formatMinutes(row.original.cycleTime)}</span>,
  },
  {
    accessorKey: "stdTime",
    header: "Std Time",
    size: 110,
    meta: { align: "center" },
    cell: ({ row }) => <span className="whitespace-nowrap font-medium">{formatMinutes(row.original.stdTime)}</span>,
  },
  {
    accessorKey: "progress",
    header: "Progress",
    size: 280,
    meta: { align: "center" },
    cell: ({ row }) => <ProgressValue value={row.original.progress} />,
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
