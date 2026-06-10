"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { MaterialResponse } from "@/features/plant/types/material.types";
import { toDisplayText } from "@/lib/format-enum";
import { MaterialDialogState } from "./material-view";



export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<MaterialDialogState>>
): ColumnDef<MaterialResponse>[] => [
        {
            accessorKey: "id",
            header: "Material ID",
        },
        {
            accessorKey: "name",
            header: "Material Name",
        },
        {
            accessorKey: "code",
            header: "Material Code",
        },
        {
            accessorKey: "materialType",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Material Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                toDisplayText(row.original.materialType)
            ),
        },
        {
            accessorKey: "uom",
            header: "UOM",
            cell: ({ row }) => row.original.uom.symbol
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
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    open: true,
                                    action: "edit",
                                    materialId: row.original.id,
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    open: true,
                                    action: "delete",
                                    materialId: row.original.id,
                                });
                            }}>
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];