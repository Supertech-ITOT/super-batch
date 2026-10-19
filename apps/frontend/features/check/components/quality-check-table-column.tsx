import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/common/components/ui/badge";
import { BatchCheckResponse } from "../types/check.types";
import { toDisplayText } from "@/common/lib/format-enum";

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
    accessorKey: "stepNo",
    header: "Step No.",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "sampleDateTime",
    header: "Sample Date & Time",
    cell: ({ row }) => {
      const value = row.original.sampleDateTime;

      if (!value) return "—";

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) return "—";

      return <span className="whitespace-nowrap text-sm">{date.toLocaleString()}</span>;
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
    accessorKey: "loop",
    header: "Loop",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "resultStatus",
    header: "Status",
  },
];

export default qualityCheckTableColumn;
