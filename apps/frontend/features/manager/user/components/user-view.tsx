"use client";

import { useState } from "react";
import UserStat from "./user-stat";
import DataTable from "./data-table";
import columns from "./columns";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { Skeleton } from "@/common/components/ui/skeleton";
import CreateUserDialog from "./create-user-dialog";
import UpdateUserDialog from "./update-user-dialog";
import DeleteUserDialog from "./delete-user-dialog";
import { Separator } from "@/common/components/ui/separator";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: number | null;
    open: boolean
}
export default function UserView() {
    const { data: users, isLoading } = useGetUser();
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false });
    const closeDialog = () =>
        setDialog({ open: false, action: null, id: null, });
    if (!users || isLoading) {
        return (
            <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-28 rounded-lg"
                        />
                    ))}
                </div>

                <Separator className="my-4" />

                {/* Full Table Skeleton */}
                <div className="flex-1 min-h-0">
                    <Skeleton className="h-full w-full rounded-lg" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
            <UserStat data={users} />
            <Separator className="my-4" />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={users}
                    setDialog={setDialog}

                />
            </div>
            {
                <>
                    {dialog.action === "create" && (
                        <CreateUserDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateUserDialog open={dialog.open} userId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteUserDialog open={dialog.open} userId={dialog.id} onClose={closeDialog} />)}
                </>
            }
        </div>
    )
} 