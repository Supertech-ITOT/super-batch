"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TransitionResponse } from "@/features/plant/types/transition.types";
import StatusBadge from "@/components/status-badge";


export const columns: ColumnDef<TransitionResponse>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => (
            <StatusBadge
                status={row.original.active ? "active" : "inactive"}
            />
        )
    },
];

export default columns;