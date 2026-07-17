"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import { UnitResponse } from "../../unit/types/unit.types";

type Props = {
    setDialog: React.Dispatch<
        React.SetStateAction<
            DialogType & { redirect?: boolean }
        >
    >;
};

export const columns = ({
    setDialog,
}: Props): ColumnDef<UnitResponse>[] => [
        {
            accessorKey: "name",
            header: "Unit Name",
        },
        {
            accessorKey: "code",
            header: "Unit Code",
        },
        {
            accessorKey: "capacity",
            header: "Unit Capacity",
        },
        {
            accessorKey: "totalEquipment",
            header: "Equipment",
        },
        {
            id: "actions",
            header: "Actions",
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