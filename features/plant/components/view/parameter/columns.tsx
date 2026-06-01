"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ParameterDialogState } from "./parameter-view";
import { ParameterResponse } from "@/features/plant/types/parameter.types";



export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<ParameterDialogState>>
): ColumnDef<ParameterResponse>[] => [
        {
            accessorKey: "id",
            header: "Parameter ID",
        },
        {
            accessorKey: "name",
            header: "Parameter Name",
        },
        {
            accessorKey: "code",
            header: "Parameter Code",
        },
        {
            accessorKey: "uom",
            header: "UOM",
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
                                    parameterId: row.original.id,
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    open: true,
                                    action: "delete",
                                    parameterId: row.original.id,
                                });
                            }}>
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];