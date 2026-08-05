"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { EquipmentResponse } from "@/features/plant/equipment/types/equipment.types";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogType & { redirect?: boolean }>>, router: AppRouterInstance): ColumnDef<EquipmentResponse>[] => [
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
        cell: ({ row }) => `${row.original.capacity} KG`,
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
            const equipment = row.original;
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
                        <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/PlantModel/equipment/?id=${equipment.id}`);
                        }}
                        >
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDialog({ type: "equipment", mode: "edit", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: false }) }}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={(e) => { e.stopPropagation(); setDialog({ type: "equipment", mode: "delete", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: false }) }}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];