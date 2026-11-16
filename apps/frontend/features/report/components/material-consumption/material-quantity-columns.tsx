import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MaterialQuantityTableData } from "../../types/report.types";

export const materialQuantityCoulumns: ColumnDef<MaterialQuantityTableData>[] = [
  {
    accessorKey: "stepNo",
    header: "Step No.",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "loop",
    header: "Loop No.",
    cell: ({ row }) => row.original.loop ?? "-",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "materialName",
    header: "Name",
    meta: {
      align: "left",
    },
  },
  {
    accessorKey: "materialCode",
    header: "Code",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "startDateTime",
    header: "StartDateTime",
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
    header: "EndDateTime",
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
    accessorKey: "stdQty",
    header: "Standard Qty",
    cell: ({ row }) => {
      const qty = row.original.stdQty;
      return qty != null ? `${qty.toFixed(2)} KG` : "-";
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "actQty",
    header: "Actual Qty",
    cell: ({ row }) => {
      const qty = row.original.actQty;
      return qty != null ? `${qty.toFixed(2)} KG` : "-";
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "varQty",
    header: "Variance Qty",
    cell: ({ row }) => {
      const variance = row.original.varQty;
      if (variance == null) return "-";
      const isLess = variance < 0;
      const isMore = variance > 0;
      return (
        <span className={isLess ? "text-primary font-semibold" : isMore ? "text-destructive font-semibold" : "text-muted-foreground font-medium"}>
          {`${isMore ? "+" : ""}${variance.toFixed(2)} KG`}
        </span>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "varPct",
    header: "Variance Percent",
    cell: ({ row }) => {
      const percentage = row.original.varPct;
      if (percentage == null) return "-";
      const isLess = percentage < 0;
      const isMore = percentage > 0;
      return (
        <span className={isLess ? "text-primary font-semibold" : isMore ? "text-destructive font-semibold" : "text-muted-foreground font-medium"}>
          {`${isMore ? "+" : ""}${percentage.toFixed(2)} %`}
        </span>
      );
    },
    meta: { align: "center" },
  },
];

export default materialQuantityCoulumns;
