"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import { UnitResponse } from "../../unit/types/unit.types";


export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogType & { redirect?: boolean }>>): ColumnDef<UnitResponse>[] => [
    {
        id: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => row.index + 1,
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "code",
        header: "Code",
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "totalEquipment",
        header: "Equipment",
        meta: {
            align: "center",
        },
    },
    {
        id: "actions",
        header: "Actions",
        meta: {
            align: "center",
        },
        cell: ({ row }) => {
            const unit = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDialog({ type: "unit", mode: "edit", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: false }) }}>
                            Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={(e) => { e.stopPropagation(); setDialog({ type: "unit", mode: "delete", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: false }) }}>
                            Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];