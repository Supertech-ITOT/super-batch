import { ColumnDef } from "@tanstack/react-table";
import { minutesToADuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { getColorByText } from "@/common/utils/color.util";
import { CollapsibleDataTable } from "@/common/components/data-table/collapsible-data-table";
import { ArrowRightLeft, Play } from "lucide-react";
import { BatchSOPResponse, BatchSOPStatusBadgeStyles } from "../types/batch.types";
import { toDisplayText } from "@/common/lib/format-enum";
import { format } from "date-fns";

export const batchStepsColumn: ColumnDef<BatchSOPResponse>[] = [
  {
    accessorKey: "stepNo",
    header: "#",
    cell: ({ row }) => (
      <div className="size-8 bg-primary/10 rounded-full flex justify-center items-center place-self-center p-0.5 shadow">
        <h1 className="text-primary font-black">{row.original.stepNo}</h1>
      </div>
    ),
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const { message, remark } = row.original;

      return (
        <div className="flex max-w-xs flex-col gap-1 whitespace-normal">
          <span className="line-clamp-2 wrap-break-word" title={message}>
            {message || "-"}
          </span>

          {remark?.trim() && (
            <span className="line-clamp-2 text-muted-foreground" title={remark}>
              Remark: {remark}
            </span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "startDateTime",
    header: "Duration",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const { startDateTime, endDateTime } = row.original;

      return (
        <div className="flex flex-col gap-0.5 whitespace-nowrap tabular-nums">
          <div className="flex items-center gap-1.5">
            <span className="w-8 text-muted-foreground text-left">Start</span>
            <span className="font-medium">{startDateTime ? format(new Date(startDateTime), "dd MMM yy, hh:mm:ss a") : "-"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-8 text-muted-foreground text-left">End</span>
            <span className="font-medium">{endDateTime ? format(new Date(endDateTime), "dd MMM yy, hh:mm:ss a") : "-"}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "stdTime",
    header: "Time",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      const { stdTime, actTime } = row.original;

      return (
        <div className="flex flex-col gap-0.5 whitespace-nowrap tabular-nums">
          <div className="flex items-center gap-1.5">
            <span className="w-10 text-left text-muted-foreground">Std</span>
            <span className="font-medium">{minutesToADuration(stdTime)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-10 text-left text-muted-foreground">Act</span>
            <span className="font-medium">{minutesToADuration(actTime)}</span>
          </div>
        </div>
      );
    },
  },

  {
    id: "transitionAction",
    header: "Process",
    cell: ({ row }) => (
      <div className="space-y-1.5 text-left">
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <div className="flex size-5 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <ArrowRightLeft className="size-3" />
            </div>
            <span className="font-medium text-left text-muted-foreground">Transition</span>
          </div>

          <Badge variant="outline" className={`${getColorByText(row.original.transitionName)} text-[10px] sm:text-xs`}>
            {row.original.transitionName}
          </Badge>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <div className="flex size-5 items-center justify-center rounded bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400">
              <Play className="size-3 fill-current" />
            </div>

            <span className="font-medium text-left text-muted-foreground">Action</span>
          </div>

          <Badge variant="outline" className={`${getColorByText(row.original.actionName)} text-[10px] sm:text-xs`}>
            {row.original.actionName}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "parameters",
    header: "Parameters",
    meta: {
      align: "center",
    },
    cell: ({ row }) => (
      <CollapsibleDataTable
        compact
        title="Parameter(s)"
        data={row.original.parameters}
        columns={[
          {
            header: "Name",
            cellClassName: "text-left",
            render: (i) => i.parameterName,
          },
          {
            header: "Std Value",
            cellClassName: "text-right",
            render: (i) => (i.stdValue != null ? i.stdValue.toFixed(2) : "-"),
          },
          {
            header: "Act Value",
            cellClassName: "text-right",
            render: (i) => (i.actValue != null ? i.actValue.toFixed(2) : "-"),
          },
        ]}
      />
    ),
  },
  {
    accessorKey: "materials",
    header: "Materials",
    meta: {
      align: "center",
    },
    cell: ({ row }) => (
      <CollapsibleDataTable
        compact
        title="Material(s)"
        data={row.original.materials}
        columns={[
          {
            header: "Name",
            cellClassName: "text-left",
            render: (i) => i.materialName,
          },
          {
            header: "Std Qty",
            cellClassName: "text-right",
            render: (i) => (i.stdQty != null ? i.stdQty.toFixed(2) : "-"),
          },
          {
            header: "Act Qty",
            cellClassName: "text-right",
            render: (i) => (i.actQty != null ? i.actQty.toFixed(2) : "-"),
          },
        ]}
      />
    ),
  },
  {
    id: "sourceDestination",
    header: "Source → Destination",
    meta: {
      align: "center",
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          {row.original.fromEquipmentId && (
            <>
              <span>{row.original.fromEquipmentCode}</span>
              <span className="text-muted-foreground">→</span>
            </>
          )}
          <span>{row.original.toEquipmentCode ?? "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "materialType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.status;
      return (
        <Badge variant="outline" className={`${BatchSOPStatusBadgeStyles[type as keyof typeof BatchSOPStatusBadgeStyles]} text-[10px] sm:text-xs`}>
          {toDisplayText(type)}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },
];

export default batchStepsColumn;
