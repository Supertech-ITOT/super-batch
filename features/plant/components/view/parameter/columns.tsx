"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ParameterResponse } from "@/features/plant/types/parameter.types";
import StatusBadge from "@/components/status-badge";
import { ProcessDialogState } from "../process-view";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"




export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<ProcessDialogState>>
): ColumnDef<ParameterResponse>[] => [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "code",
            header: "Code",
        },
        {
            accessorKey: "uom",
            header: "UOM",
            cell: ({ row }) => row.original.uom.symbol
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => (
                <StatusBadge
                    status={row.original.active ? "active" : "inactive"}
                />
            )
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
                                    entity: "parameter",
                                    id: row.original.id,
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    open: true,
                                    action: "delete",
                                    entity: "parameter",
                                    id: row.original.id,
                                });
                            }}>
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },

    ];

export default columns;