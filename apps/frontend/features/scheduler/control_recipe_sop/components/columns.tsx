import { ColumnDef } from "@tanstack/react-table";
import { ControlRecipeSOPResponse } from "../types/control_recipe-sop-types";
import { minutesToADuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { getColorByText } from "@/common/utils/color.util";
import { CollapsibleDataTable } from "@/common/components/collapsible-data-table";
import { ArrowRightLeft, Circle, Play } from "lucide-react";

export const columns: ColumnDef<ControlRecipeSOPResponse>[] = [
    {
        accessorKey: "stepNo",
        header: "Step",
        cell: ({ row }) => (
            <div className="size-8 bg-primary/10 rounded-full flex justify-center items-center place-self-center p-0.5 shadow" >
                <h1 className="text-primary font-black">{row.original.stepNo}</h1>
            </div>
        )
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
            <div
                className="max-w-xs wrap-break-word whitespace-normal line-clamp-2"
                title={row.original.message}
            >
                {row.original.message}
            </div>
        ),
    },
    {
        accessorKey: "stdTime",
        header: "Std Time",
        cell: ({ row }) => (
            <div>
                {minutesToADuration(row.original.stdTime)}
            </div>
        )
    },

    {
        id: "transitionAction",
        header: "Process",
        cell: ({ row }) => (
            <div className="space-y-1.5">
                <div className="grid grid-cols-[18px_54px_1fr] items-center gap-2">
                    <div className="flex size-5 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <ArrowRightLeft className="size-3" />
                    </div>

                    <span className="text-xs font-medium text-left text-muted-foreground">
                        Transition
                    </span>

                    <Badge
                        variant="outline"
                        className={getColorByText(row.original.transitionName)}
                    >
                        <Circle className="mr-1 size-2 fill-current" />
                        {row.original.transitionName}
                    </Badge>
                </div>

                <div className="grid grid-cols-[18px_54px_1fr] items-center gap-2">
                    <div className="flex size-5 items-center justify-center rounded bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400">
                        <Play className="size-3 fill-current" />
                    </div>

                    <span className="text-xs font-medium text-left text-muted-foreground">
                        Action
                    </span>

                    <Badge
                        variant="outline"
                        className={getColorByText(row.original.actionName)}
                    >
                        <Circle className="mr-1 size-2 fill-current" />
                        {row.original.actionName}
                    </Badge>
                </div>
            </div>
        )
    },
    {
        accessorKey: "parameters",
        header: "Parameters",
        cell: ({ row }) => (
            <CollapsibleDataTable
                title="Parameter(s)"
                data={row.original.parameters}
                columns={[
                    {
                        header: "Sr.",
                        render: (_, index) => index + 1,
                    },
                    {
                        header: "Name",
                        cellClassName: "text-left",
                        render: (i) => i.parameterName,
                    },
                    {
                        header: "Std Value",
                        cellClassName: "text-right",
                        render: (i) => i.stdValue,
                    },
                ]}
            />
        ),
    },
    {
        accessorKey: "materials",
        header: "Materials",
        cell: ({ row }) => (
            <CollapsibleDataTable
                title="Material(s)"
                data={row.original.materials}
                columns={[
                    {
                        header: "Sr.",
                        render: (_, index) => index + 1,
                    },
                    {
                        header: "Name",
                        cellClassName: "text-left",
                        render: (i) => i.materialName,
                    },
                    {
                        header: "Std Qty",
                        cellClassName: "text-right",
                        render: (i) => i.stdQty,
                    },
                ]}
            />
        ),
    },
    {
        id: "sourceDestination",
        header: "Source → Destination",
        cell: ({ row }) => {
            const { fromEquipment, toEquipment } = row.original;
            return (
                <div className="flex items-center justify-center gap-2">
                    {fromEquipment && (
                        <>
                            <span>{fromEquipment.code}</span>
                            <span className="text-muted-foreground">→</span>
                        </>
                    )}
                    <span>{toEquipment.code ?? "-"}</span>
                </div>
            );
        }
    }
];

export default columns;