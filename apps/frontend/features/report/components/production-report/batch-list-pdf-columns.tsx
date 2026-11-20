import { Text } from "@react-pdf/renderer";
import { format } from "date-fns";
import { minutesToADuration } from "@/common/utils/duration.util";
import { toDisplayText } from "@/common/lib/format-enum";
import { BatchesResponse } from "../../types/report.types";
import { PDFColumnDef } from "@/common/components/pdf/elements/PDFTable";
import { PDFTheme } from "@/common/components/pdf";
import { PDFBadge } from "@/common/components/pdf/elements/PDFBadge";
import { BatchSOPStatusPDFStyles, BatchStatus } from "@/features/batch/types/batch.types";

const cellStyle = { fontSize: 6 };
const varianceStyle = (value: number) => ({
  ...cellStyle,
  fontWeight: "bold" as const,
  color: value < 0 ? PDFTheme.primary : value > 0 ? PDFTheme.destructive : PDFTheme.muted,
});

export const batchListPdfColumns: PDFColumnDef<BatchesResponse>[] = [
  {
    accessorKey: "batchNo",
    header: "BatchNo",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.batchNo}</Text>,
    meta: { align: "left" },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.unit.code}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.product.code}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "startDateTime",
    header: "Start",
    cell: ({ row }) => {
      const value = row.original.startDateTime;

      if (!value || new Date(value).getTime() === 0) {
        return <Text style={cellStyle}>-</Text>;
      }

      return (
        <Text style={{ ...cellStyle, textAlign: "center" }}>
          {format(new Date(value), "dd MMM yy")}
          {"\n"}
          {format(new Date(value), "hh:mm a")}
        </Text>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "endDateTime",
    header: "End",
    cell: ({ row }) => {
      const value = row.original.endDateTime;

      if (!value || new Date(value).getTime() === 0) {
        return <Text style={cellStyle}>-</Text>;
      }

      return (
        <Text style={{ ...cellStyle, textAlign: "center" }}>
          {format(new Date(value), "dd MMM yy")}
          {"\n"}
          {format(new Date(value), "hh:mm a")}
        </Text>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "standardTime",
    header: "Std Time",
    cell: ({ row }) => <Text style={cellStyle}>{minutesToADuration(row.original.standardTime)}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "actualTime",
    header: "Act Time",
    cell: ({ row }) => <Text style={cellStyle}>{minutesToADuration(row.original.actualTime)}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "varianceTime",
    header: "Var Time",
    cell: ({ row }) => {
      const variance = row.original.varianceTime;

      if (variance == null) return <Text style={cellStyle}>-</Text>;

      return <Text style={varianceStyle(variance)}>{minutesToADuration(variance)}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "standardSize",
    header: "Std Size",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.standardSize.toFixed(2)} KG</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "actualSize",
    header: "Act Size",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.actualSize.toFixed(2)} KG</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "varianceSize",
    header: "Var Size",
    cell: ({ row }) => {
      const variance = row.original.varianceSize;
      return (
        <Text style={varianceStyle(variance)}>
          {variance > 0 ? "+" : ""}
          {variance.toFixed(2)} KG
        </Text>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "completionPercentage",
    header: "Steps",
    cell: ({ row }) => {
      const { completedSteps, totalSteps, completionPercentage } = row.original;
      return (
        <Text style={cellStyle}>
          {completedSteps}/{totalSteps}
        </Text>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "status",
    header: "Status",
    width: "10%",
    cell: ({ row }) => {
      const status = row.original.status;
      const styles = BatchSOPStatusPDFStyles[status as keyof typeof BatchSOPStatusPDFStyles];
      return (
        <PDFBadge variant="outline" backgroundColor={styles?.backgroundColor} color={styles?.color}>
          {toDisplayText(status)}
        </PDFBadge>
      );
    },
    meta: { align: "center" },
  },
];
