import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/common/components/ui/badge";
import { BatchCheckResponse, ResultStatusBadgeStyles } from "../types/check.types";
import { format, isValid, parseISO } from "date-fns";

export const qualityCheckTableColumn: ColumnDef<BatchCheckResponse>[] = [
  {
    id: "srNo",
    header: "Sr. No.",
    cell: ({ row }) => <span className="font-medium tabular-nums text-muted-foreground">{row.index + 1}</span>,
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "loop",
    header: "Loop",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "stepNo",
    header: "Step No.",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "sampleDateTime",
    header: "Sample DateTime",
    cell: ({ row }) => {
      const value = row.original.sampleDateTime;
      if (!value) return "—";
      const date = parseISO(value);
      if (!isValid(date)) return "-";
      return <span className="whitespace-nowrap text-sm">{format(date, "dd MMM yy hh:mm a")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Check Parameter",
    cell: ({ row }) => <span className="font-medium">{row.original.checkParameterName}</span>,
  },
  {
    accessorKey: "value",
    header: "Result",
    cell: ({ row }) => <span className="font-medium tabular-nums">{row.original.value || "—"}</span>,
  },
  {
    accessorKey: "resultStatus",
    header: "Status",
    cell: ({ row }) => {
      const type = row.original.resultStatus;
      return (
        <Badge variant="outline" className={ResultStatusBadgeStyles[type as keyof typeof ResultStatusBadgeStyles]}>
          {type}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },
];

export default qualityCheckTableColumn;
