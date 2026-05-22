"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import StatusBadge from "@/components/status-badge";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export type Area = {
    id: number;
    areaName: string;
    areaType: string;
    areaStatus: string;
    totalUnits: number;
    totalEquipment: number;
};

export const columns: ColumnDef<Area>[] = [
    {
        accessorKey: "areaName",
        header: "Area Name",
    },
    {
        accessorKey: "areaType",
        header: "Area Type",
    },
    {
        accessorKey: "areaStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <StatusBadge status={row.original.areaStatus} />
        ),
    },
    {
        accessorKey: "totalUnits",
        header: "Units",
    },
    {
        accessorKey: "totalEquipment",
        header: "Equipment",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const area = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];