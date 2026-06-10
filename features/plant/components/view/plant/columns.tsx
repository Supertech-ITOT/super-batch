"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AreaResponse } from "@/features/plant/types/area.types";
import { DialogType } from "@/features/plant/types/plant-hierarchy.types";
import { Badge } from "@/components/ui/badge";
import { toDisplayText } from "@/lib/format-enum";
import { StatusBadgeStyles } from "@/features/common/types/status.type";

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
            accessorKey: "status",
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
                <Badge
                    variant="outline"
                    className={StatusBadgeStyles[row.original.status]}
                >
                    {toDisplayText(row.original.status)}
                </Badge>
            ),
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