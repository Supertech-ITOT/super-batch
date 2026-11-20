import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ParameterValueData } from "../../types/report.types";

export const parameterValueCoulumns: ColumnDef<ParameterValueData>[] = [
  {
    accessorKey: "stepNo",
    header: "Step No.",
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "dateTime",
    header: "DateTime",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const value = row.original.dateTime;
      if (!value || new Date(value).getTime() === 0) {
        return "-";
      }
      return format(new Date(value), "dd MMM yyyy hh:mm a");
    },
  },
  {
    accessorKey: "stdVal",
    header: "Standard Value",
    cell: ({ row }) => {
      const qty = row.original.stdVal;
      return qty != null ? `${qty.toFixed(2)} KG` : "-";
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "actVal",
    header: "Actual Value",
    cell: ({ row }) => {
      const qty = row.original.actVal;
      return qty != null ? `${qty.toFixed(2)} KG` : "-";
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "deviation",
    header: "Deviation Value",
    cell: ({ row }) => {
      const value = row.original.deviation;
      if (value == null) return "-";
      const isLess = value < 0;
      const isMore = value > 0;
      return (
        <span className={isLess ? "text-primary font-semibold" : isMore ? "text-destructive font-semibold" : "text-muted-foreground font-medium"}>
          {`${isMore ? "+" : ""}${value.toFixed(2)} KG`}
        </span>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "deviationPercent",
    header: "Deviation Percent",
    cell: ({ row }) => {
      const percentage = row.original.deviationPercent;
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

export default parameterValueCoulumns;
