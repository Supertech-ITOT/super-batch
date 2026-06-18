"use client";

import { useState } from "react";
import UserStat from "./user-stat";
import DataTable from "./data-table";
import columns from "./columns";
import { useGetUser } from "@/features/manager/hooks/use-user";
import { Skeleton } from "@/common/components/ui/skeleton";
import CreateUserDialog from "./create-user-dialog";
import UpdateUserDialog from "./update-user-dialog";
import DeleteUserDialog from "./delete-user-dialog";

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
            <Skeleton />
        )
    }
    return (
        <div className="bg-card h-full border rounded-lg flex flex-col p-6">
            <UserStat isLoading={isLoading} data={users} />
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