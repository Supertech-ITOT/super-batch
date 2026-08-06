"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProcessDialogState } from "../../common/components/process-view";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { Button } from "@/common/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { ParameterResponse } from "../types/parameter.types";
export const columns = (setDialog: React.Dispatch<React.SetStateAction<ProcessDialogState>>): ColumnDef<ParameterResponse>[] => [
    {
        id: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => row.index + 1,
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "id",
        header: "Id",
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        meta: {
            align: "left",
        },
    },
    {
        accessorKey: "uom",
        header: "Uom",
        cell: ({ row }) => row.original.uom.symbol,
        meta: {
            align: "center",
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const parameter = row.original

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
                                id: parameter.id,
                            });
                        }}>
                            Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={(e) => {
                            e.stopPropagation(); setDialog({
                                open: true,
                                action: "delete",
                                entity: "parameter",
                                id: parameter.id,
                            });
                        }}>
                            Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        meta: {
            align: "center",
        },
    },

];

export default columns;