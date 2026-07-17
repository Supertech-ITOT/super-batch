import { ColumnDef } from "@tanstack/react-table";
import { RecipeSOPResponse } from "../types/recipe-sop-types";
import { minutesToDuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { getColorByText } from "@/common/utils/color.util";
import { CollapsibleDataTable } from "@/common/components/collapsible-data-table";

export const columns: ColumnDef<RecipeSOPResponse>[] = [
    {
        accessorKey: "stepNo",
        header: "Step No.",
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
                className="max-w-sm wrap-break-word whitespace-normal line-clamp-2"
                title={row.original.message}
            >
                {row.original.message}
            </div>
        ),
    },
    {
        accessorKey: "stdTime",
        header: "Standard Time",
        cell: ({ row }) => (
            <div>
                {minutesToDuration(row.original.stdTime)}
            </div>
        )
    },

    {
        accessorKey: "transitionName",
        header: "Transition",
        cell: ({ row }) => (
            <Badge variant={"outline"} className={getColorByText(row.original.transitionName)}>
                {row.original.transitionName}
            </Badge>
        )
    },
    {
        accessorKey: "actionName",
        header: "Action",
        cell: ({ row }) => (
            <Badge variant={"outline"} className={getColorByText(row.original.actionName)}>
                {row.original.actionName}
            </Badge>
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
                        header: "Standard Value",
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
                        header: "Standard Qty",
                        cellClassName: "text-right",
                        render: (i) => i.stdQty,
                    },
                ]}
            />
        ),
    },
    {
        accessorKey: "fromEquipmentName",
        header: "From Equipment",
        cell: ({ row }) => row.original.fromEquipmentName ?? "-"
    },
    {
        accessorKey: "toEquipmentName",
        header: "To Equipment"
    }
];

export default columns;