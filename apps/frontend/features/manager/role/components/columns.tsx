"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { DialogProp } from "./role-view";
import { format } from "date-fns";
import { RoleResponse } from "@/features/manager/role/types/role.types";



export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<DialogProp>>
): ColumnDef<RoleResponse>[] => [
        {
            id: "srNo",
            header: "Sr. No.",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div
                    className="max-w-sm wrap-break-word whitespace-normal line-clamp-2"
                    title={row.original.description}
                >
                    {row.original.description}
                </div>
            ),
        },
        {
            id: "permission",
            header: "Permission",
            cell: ({ row }) => {
                const permissions = row.original.permissions;
                const assigned = permissions.reduce(
                    (count, p) => count + (p.access ? 1 : 0), 0
                );
                const total = permissions.length * 2;
                return `${assigned}/${total}`;
            },
        },
        {
            id: "lastModified",
            header: "Last Modified",
            cell: ({ row }) => {
                const value = row.original.updatedAt || row.original.createdAt;

                if (!value || new Date(value).getTime() === 0) {
                    return "-";
                }

                return format(new Date(value), "dd MMM yyyy hh:mm a");
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const role = row.original

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
                                    action: "edit",
                                    id: role.id,
                                    open: true
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    action: "delete",
                                    id: role.id,
                                    open: true
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