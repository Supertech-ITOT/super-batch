import type { ColumnDef } from "@tanstack/react-table";
import { MaterialCorrectionResponse } from "../types/check.types";

export const materialCorrectionColumns : ColumnDef<MaterialCorrectionResponse>[]=  [
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
    accessorKey: "loop",
    header: "Loop",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <span className="font-mono text-sm font-medium">{row.original.materialCode || "—"}</span>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <span className="font-medium">{row.original.materialName || "—"}</span>,
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => <span className="tabular-nums font-medium">{row.original.qty ?? "—"}</span>,
    meta: {
      align: "right",
    },
  },
];

export default materialCorrectionColumns;
