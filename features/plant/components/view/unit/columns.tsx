"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { EquipmentResponse } from "@/features/plant/types/equipment.types";
import { DialogType } from "@/features/plant/types/plant-hierarchy.types";
import { toDisplayText } from "@/lib/format-enum";

type Props = {
    setDialog: React.Dispatch<
        React.SetStateAction<
            DialogType & { redirect?: boolean }
        >
    >;
};
export const columns = ({
    setDialog,
}: Props): ColumnDef<EquipmentResponse>[] => [
        {
            accessorKey: "name",
            header: "Equipment Name",
        },
        {
            accessorKey: "code",
            header: "Equipment Code",
        },
        {
            accessorKey: "capacity",
            header: "Equipment Capacity",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const equipment = row.original

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