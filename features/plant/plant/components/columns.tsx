"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { AreaResponse } from "@/features/plant/area/types/area.types";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";



type Props = {
    setDialog: React.Dispatch<
        React.SetStateAction<
            DialogType & { redirect?: boolean }
        >
    >;
};

export const columns = ({
    setDialog,
}: Props): ColumnDef<AreaResponse>[] => [
        {
            accessorKey: "name",
            header: "Area Name",
        },
        {
            accessorKey: "areaType",
            header: "Area Type",
        },
        {
            accessorKey: "totalUnit",
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
                            <Button variant="ghost" className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

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