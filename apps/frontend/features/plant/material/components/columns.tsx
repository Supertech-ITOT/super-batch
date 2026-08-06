"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { toDisplayText } from "@/common/lib/format-enum";
import { Badge } from "@/common/components/ui/badge";
import { MaterialDialogState } from "./material-view";
import { MaterialResponse, MaterialTypeBadgeStyles } from "../types/material.types";



export const columns = (setDialog: React.Dispatch<React.SetStateAction<MaterialDialogState>>): ColumnDef<MaterialResponse>[] => [
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
            align: "center",
        },
    },
    {
        accessorKey: "code",
        header: "Code",
        meta: {
            align: "center",
        },
    },
    {
        accessorKey: "materialType",
        header: "Type",
        cell: ({ row }) => {
            const type = row.original.materialType;
            return (
                <Badge
                    variant="outline"
                    className={MaterialTypeBadgeStyles[type as keyof typeof MaterialTypeBadgeStyles]}
                >
                    {toDisplayText(type)}
                </Badge>

            );
        },
        meta: {
            align: "center",
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const material = row.original

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
                                materialId: material.id,
                            });
                        }}>
                            Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={(e) => {
                            e.stopPropagation(); setDialog({
                                open: true,
                                action: "delete",
                                materialId: material.id,
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