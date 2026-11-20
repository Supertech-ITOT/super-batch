import { Text } from "@react-pdf/renderer";
import { format } from "date-fns";
import { minutesToADuration } from "@/common/utils/duration.util";
import { toDisplayText } from "@/common/lib/format-enum";
import { BatchSopResponse } from "../../types/report.types";
import { PDFColumnDef } from "@/common/components/pdf/elements/PDFTable";
import { PDFTheme } from "@/common/components/pdf";
import { getPDFColorByText } from "@/common/utils/color.util";
import { PDFBadge } from "@/common/components/pdf/elements/PDFBadge";
import { BatchSOPStatusPDFStyles } from "@/features/batch/types/batch.types";

const cellStyle = { fontSize: 6 };

const varianceStyle = (value: number) => ({
  ...cellStyle,
  fontWeight: "bold" as const,
  color: value < 0 ? PDFTheme.primary : value > 0 ? PDFTheme.destructive : PDFTheme.muted,
});

export const batchSopsPdfColumns: PDFColumnDef<BatchSopResponse>[] = [
  {
    accessorKey: "stepNo",
    header: "Step",
    width: "4%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.stepNo}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "message",
    header: "Message",
    width: "15%",
    cell: ({ row }) => {
      const { message, remark } = row.original;

      return (
        <Text style={cellStyle}>
          {message || "-"}
          {remark?.trim() ? `\nRemark: ${remark}` : ""}
        </Text>
      );
    },
    meta: { align: "left" },
  },
  {
    header: "Transition",
    width: "15%",
    cell: ({ row }) => {
      const colors = getPDFColorByText(row.original.transition);

      return (
        <PDFBadge backgroundColor={colors.backgroundColor} color={colors.color}>
          {row.original.transition || "-"}
        </PDFBadge>
      );
    },
    meta: { align: "left" },
  },
  {
    header: "Action",
    width: "15%",
    cell: ({ row }) => {
      const colors = getPDFColorByText(row.original.action);

      return (
        <PDFBadge backgroundColor={colors.backgroundColor} color={colors.color}>
          {row.original.action || "-"}
        </PDFBadge>
      );
    },
    meta: { align: "left" },
  },
  {
    accessorKey: "fromEquipment",
    header: "From",
    width: "7%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.fromEquipment ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "toEquipment",
    header: "To",
    width: "7%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.toEquipment ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "startDateTime",
    header: "Start",
    width: "6%",
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
    width: "6%",
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
    width: "6%",
    cell: ({ row }) => <Text style={cellStyle}>{minutesToADuration(row.original.standardTime)}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "actualTime",
    header: "Act Time",
    width: "5%",
    cell: ({ row }) => <Text style={cellStyle}>{minutesToADuration(row.original.actualTime)}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "varianceTime",
    header: "Var Time",
    width: "5%",
    cell: ({ row }) => {
      const variance = row.original.varianceTime;

      if (variance == null) {
        return <Text style={cellStyle}>-</Text>;
      }

      return <Text style={varianceStyle(variance)}>{minutesToADuration(variance)}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "status",
    header: "Status",
    width: "9%",
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

export default batchSopsPdfColumns;
