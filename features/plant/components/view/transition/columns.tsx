"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProcessDialogState } from "../process-view";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { TransitionResponse } from "@/features/plant/types/transition.types";
import { Badge } from "@/components/ui/badge";
import { StatusBadgeStyles } from "@/features/common/types/status.type";
import { toDisplayText } from "@/lib/format-enum";



export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<ProcessDialogState>>
): ColumnDef<TransitionResponse>[] => [
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
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => (
                <Badge
                    variant="outline"
                    className={StatusBadgeStyles[row.original.active ? "ACTIVE" : "INACTIVE"]}
                >
                    {toDisplayText(row.original.active ? "ACTIVE" : "INACTIVE")}
                </Badge>
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
                                    entity: "transition",
                                    id: row.original.id,
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    open: true,
                                    action: "delete",
                                    entity: "transition",
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