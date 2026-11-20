import type { ColumnDef } from "@tanstack/react-table";
import { MaterialCorrectionResponse } from "../types/check.types";
import { format, isValid, parseISO } from "date-fns";

export const materialCorrectionColumns: ColumnDef<MaterialCorrectionResponse>[] = [
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
    accessorKey: "loop",
    header: "Loop",
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
    accessorKey: "materialCode",
    header: "Code",
    cell: ({ row }) => <span className="font-mono text-sm font-medium">{row.original.materialCode || "—"}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.materialName || "—"}</span>,
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => <span className="tabular-nums font-medium">{row.original.qty.toFixed(2) ?? "—"}</span>,
    meta: {
      align: "right",
    },
  },
];

export default materialCorrectionColumns;
