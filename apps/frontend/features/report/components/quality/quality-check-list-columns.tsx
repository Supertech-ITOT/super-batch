import { Badge } from "@/common/components/ui/badge";
import { ResultStatusBadgeStyles } from "@/features/check/types/check.types";
import { CheckParameterType, CheckParameterTypeBadgeStyles } from "@/features/plant/check-parameter/types/checkParameter.types";
import { QualityCheckSampleResult } from "../../types/report.types";
import { ColumnDef } from "@tanstack/react-table";
import { toDisplayText } from "@/common/lib/format-enum";

export const qualityCheckListColumns: ColumnDef<QualityCheckSampleResult>[] = [
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
    accessorKey: "parameterName",
    header: "Parameter",
    cell: ({ row }) => <span className="font-medium">{row.original.parameterName}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <Badge
          variant="outline"
          className={`${CheckParameterTypeBadgeStyles[type as keyof typeof CheckParameterTypeBadgeStyles]} text-[10px] sm:text-xs`}
        >
          {toDisplayText(type)}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },
  {
    accessorKey: "value",
    header: "Result",
    cell: ({ row }) => <span className="font-medium tabular-nums">{row.original.value || "—"}</span>,
  },
  {
    id: "rangeOptions",
    header: "Range / Options",
    cell: ({ row }) => {
      const checkParameter = row.original;
      if (checkParameter.type === CheckParameterType.QUANTITATIVE) {
        return (
          <span>
            {checkParameter.min} - {checkParameter.max}
          </span>
        );
      }

      const allowedOptions = checkParameter?.allowedOptions?.join(", ");
      const notAllowedOptions = checkParameter?.notAllowedOptions?.join(", ");

      return (
        <div className="text-[10px] sm:text-xs">
          <div>
            <span className="font-medium">Allowed:</span> {allowedOptions || "-"}
          </div>

          <div>
            <span className="font-medium">Not Allowed:</span> {notAllowedOptions || "-"}
          </div>
        </div>
      );
    },
    meta: {
      align: "left",
    },
  },
  {
    accessorKey: "resultStatus",
    header: "Status",
    cell: ({ row }) => {
      const type = row.original.resultStatus;
      return (
        <Badge variant="outline" className={`${ResultStatusBadgeStyles[type as keyof typeof ResultStatusBadgeStyles]} text-[10px] sm:text-xs`}>
          {type}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },
];

export default qualityCheckListColumns;
