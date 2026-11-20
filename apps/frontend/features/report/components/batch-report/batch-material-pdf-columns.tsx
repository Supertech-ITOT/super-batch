import { Text } from "@react-pdf/renderer";
import { PDFColumnDef } from "@/common/components/pdf/elements/PDFTable";
import { format } from "date-fns";
import { MaterialQuantityTableData } from "../../types/report.types";
import { PDFTheme } from "@/common/components/pdf";

const cellStyle = { fontSize: 6 };

const varianceStyle = (value: number) => ({
  ...cellStyle,
  fontWeight: "bold" as const,
  color: value < 0 ? PDFTheme.primary : value > 0 ? PDFTheme.destructive : PDFTheme.muted,
});

export const batchMaterialPdfColunns: PDFColumnDef<MaterialQuantityTableData>[] = [
  {
    accessorKey: "stepNo",
    header: "Step",
    width: "5%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.stepNo}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "loop",
    header: "Loop",
    width: "5%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.loop ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "materialName",
    header: "Name",
    width: "15%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.materialName ?? "-"}</Text>,
    meta: { align: "left" },
  },
  {
    accessorKey: "materialCode",
    header: "Code",
    width: "10%",
    cell: ({ row }) => <Text style={cellStyle}>{row.original.materialCode ?? "-"}</Text>,
    meta: { align: "center" },
  },
  {
    accessorKey: "startDateTime",
    header: "Start",
    width: "15%",
    cell: ({ row }) => {
      const value = row.original.startDateTime;

      if (!value || new Date(value).getTime() === 0) {
        return <Text style={cellStyle}>-</Text>;
      }

      return <Text style={cellStyle}>{format(new Date(value), "dd MMM yy hh:mm a")}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "endDateTime",
    header: "End",
    width: "15%",
    cell: ({ row }) => {
      const value = row.original.endDateTime;

      if (!value || new Date(value).getTime() === 0) {
        return <Text style={cellStyle}>-</Text>;
      }

      return <Text style={cellStyle}>{format(new Date(value), "dd MMM yy hh:mm a")}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "stdQty",
    header: "Std Qty",
    width: "10%",
    cell: ({ row }) => {
      const qty = row.original.stdQty;

      return <Text style={cellStyle}>{qty != null ? `${qty.toFixed(2)} KG` : "-"}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "actQty",
    header: "Act Qty",
    width: "10%",
    cell: ({ row }) => {
      const qty = row.original.actQty;

      return <Text style={cellStyle}>{qty != null ? `${qty.toFixed(2)} KG` : "-"}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "varQty",
    header: "Var Qty",
    width: "10%",
    cell: ({ row }) => {
      const variance = row.original.varQty;

      if (variance == null) {
        return <Text style={cellStyle}>-</Text>;
      }

      return <Text style={varianceStyle(variance)}>{`${variance > 0 ? "+" : ""}${variance.toFixed(2)} KG`}</Text>;
    },
    meta: { align: "center" },
  },
  {
    accessorKey: "varPct",
    header: "Var Pct",
    width: "5%",
    cell: ({ row }) => {
      const percentage = row.original.varPct;

      if (percentage == null) {
        return <Text style={cellStyle}>-</Text>;
      }

      return <Text style={varianceStyle(percentage)}>{`${percentage > 0 ? "+" : ""}${percentage.toFixed(2)} %`}</Text>;
    },
    meta: { align: "center" },
  },
];

export default batchMaterialPdfColunns;
