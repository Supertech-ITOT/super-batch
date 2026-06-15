"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { DialogProp } from "./user-view";
import ColorfullBadge from "@/common/components/colorfull-badge";

export type UserResponse = {
    id: number;
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    updatedAt: string;
};

export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<DialogProp>>
): ColumnDef<UserResponse>[] => [
        {
            id: "srNo",
            header: "Sr. No.",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow">
                            <User className="fill-gray-500 size-6! shrink-0 stroke-none" />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium">
                                {user.name}
                            </span>

                            <span className="text-sm text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
                <ColorfullBadge value={row.original.role} />
            ),
        },
        {
            accessorKey: "lastLogin",
            header: "LastLogin",
        },
        {
            accessorKey: "updatedAt",
            header: "Last Updated",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original

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
                                    id: user.id,
                                });
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({
                                    action: "delete",
                                    id: user.id,
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