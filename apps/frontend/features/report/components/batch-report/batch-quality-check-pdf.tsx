import { Text } from "@react-pdf/renderer";
import { PDFColumnDef } from "@/common/components/pdf/elements/PDFTable";
import { QualityCheckSampleResult } from "../../types/report.types";
import { toDisplayText } from "@/common/lib/format-enum";
import { CheckParameterType, CheckParameterTypePDFBadgeStyles } from "@/features/plant/check-parameter/types/checkParameter.types";
import { PDFBadge } from "@/common/components/pdf/elements/PDFBadge";
import { ResultStatus } from "@/features/check/types/check.types";

const cellStyle = { fontSize: 6 };

export const batchQualityCheckPdfColunns: PDFColumnDef<QualityCheckSampleResult>[] = [
  {
    accessorKey: "stepNo",
    header: "Step",
    width: "6%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.stepNo ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "loop",
    header: "Loop",
    width: "6%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.loop ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "parameterName",
    header: "Parameter",
    width: "20%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.parameterName ?? "-"}</Text>,
    meta: { align: "left" },
  },
  {
    accessorKey: "type",
    header: "Type",
    width: "10%",
    cell: ({ row }) => {
      const type = row.original.type;
      const badgeStyle = CheckParameterTypePDFBadgeStyles[type as keyof typeof CheckParameterTypePDFBadgeStyles];
      return (
        <PDFBadge compact backgroundColor={badgeStyle.backgroundColor} color={badgeStyle.color}>
          {toDisplayText(type)}
        </PDFBadge>
      );
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "value",
    header: "Result",
    width: "12%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.value ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    header: "Range / Options",
    width: "30%",
    cell: ({ row }) => {
      const checkParameter = row.original;
      if (checkParameter.type === CheckParameterType.QUANTITATIVE) {
        return <Text style={cellStyle}>{`${checkParameter.min ?? "-"} - ${checkParameter.max ?? "-"}`}</Text>;
      }
      const allowedOptions = checkParameter.allowedOptions?.join(", ") || "-";
      const notAllowedOptions = checkParameter.notAllowedOptions?.join(", ") || "-";
      return <Text style={cellStyle}>{`Allowed: ${allowedOptions}\nNot Allowed: ${notAllowedOptions}`}</Text>;
    },
    meta: { align: "left" },
  },
  {
    accessorKey: "resultStatus",
    header: "Status",
    width: "10%",
    cell: ({ row }) => {
      const status = row.original.resultStatus;
      return (
        <PDFBadge compact variant={status !== ResultStatus.PASS ? "destructive" : "default"}>
          {status}
        </PDFBadge>
      );
    },
    meta: { align: "center" },
  },
];

export default batchQualityCheckPdfColunns;
