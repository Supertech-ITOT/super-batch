import { ColumnDef } from "@tanstack/react-table";
import { RecipeResponse } from "../types/recipe-types";
import { minutesToDuration } from "@/common/utils/duration.util";
import { Badge } from "@/common/components/ui/badge";
import { getColorByText } from "@/common/utils/color.util";
import { CollapsibleDataTable } from "@/common/components/collapsible-data-table";

export const columns: ColumnDef<RecipeResponse>[] = [
    {
        accessorKey: "stepNo",
        header: "Step No.",
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
                        render: (parameter) => parameter.parameterName,
                    },
                    {
                        header: "Standard Value",
                        cellClassName: "text-right",
                        render: (parameter) => parameter.stdValue,
                    },
                ]}
            />
        ),
    },


];

export default columns;