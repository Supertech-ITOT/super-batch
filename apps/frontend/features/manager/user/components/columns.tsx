"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, MoreHorizontal, User } from "lucide-react"
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/common/components/ui/dropdown-menu"
import { DialogProp } from "./user-view";
import ColorfullBadge from "@/common/components/colorfull-badge";
import { UserResponse } from "@/features/manager/user/types/user.types";
import { format } from "date-fns";
import { getColorByText } from "@/common/utils/color.util";
import { Badge } from "@/common/components/ui/badge";



export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<DialogProp>>
): ColumnDef<UserResponse>[] => [
        {
            id: "srNo",
            header: "Sr. No.",
            cell: ({ row }) => row.index + 1,
        },
        {
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;
                if (!user) return "-";
                const initials = user.name?.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase();
                return (
                    <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${getColorByText(user.name)}`}>
                            {initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">
                                {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
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
                <Badge variant={"outline"} className={getColorByText(row.original.roleName)}>
                    <Circle className="size-2.5 fill-current" />
                    {row.original.roleName}
                </Badge>
            ),
        },
        {
            accessorKey: "lastLogin",
            header: "Last Login",
            cell: ({ row }) => {
                const value = row.original.lastLoginAt;

                if (!value || new Date(value).getTime() === 0) {
                    return "-";
                }

                return format(new Date(value), "dd MMM yyyy hh:mm a");
            }
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
                                e.stopPropagation(); setDialog({ action: "edit", id: user.id, open: true });;
                            }}>
                                Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                e.stopPropagation(); setDialog({ action: "delete", id: user.id, open: true });
                            }}>
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];
export default columns;