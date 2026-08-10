"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { AreaResponse } from "@/features/plant/area/types/area.types";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogType & { redirect?: boolean }>>, router: AppRouterInstance): ColumnDef<AreaResponse>[] => [
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
        accessorKey: "totalUnit",
        header: "Units",
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
            const area = row.original

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
                            router.push(`/PlantModel/area/?id=${area.id}`);
                        }}
                        >
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDialog({ type: "area", mode: "edit", node: { id: area.id, name: area.name, type: "area" }, redirect: false }) }}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={(e) => { e.stopPropagation(); setDialog({ type: "area", mode: "delete", node: { id: area.id, name: area.name, type: "area" }, redirect: false }) }}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];