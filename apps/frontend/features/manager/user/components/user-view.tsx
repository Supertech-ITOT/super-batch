"use client";

import { useState } from "react";
import UserStat from "./user-stat";
import columns from "./columns";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { Skeleton } from "@/common/components/ui/skeleton";
import CreateUserDialog from "./create-user-dialog";
import UpdateUserDialog from "./update-user-dialog";
import DeleteUserDialog from "./delete-user-dialog";
import { Separator } from "@/common/components/ui/separator";
import ResetPasswordUserDialog from "./reset-password-user-dialog";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";
import UserSkeleton from "./user-skeleton";
import FeedbackState from "../../../../common/components/feedback-state";

export type DialogProp = {
    action: "create" | "edit" | "delete" | "reset" | null;
    id: number | null;
    open: boolean
}
export default function UserView() {
    const { data: users, isLoading, isError } = useGetUser();
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false });
    const closeDialog = () =>
        setDialog({ open: false, action: null, id: null, });
    const loading = isLoading;
    if (loading) {
        return <UserSkeleton />;
    }
    if (isError) {
        return <FeedbackState variant="error" />;
    }
    if (!users) {
        return <FeedbackState variant="empty" />;
    }
    return (
        <div className="sm:flex-1 flex flex-col rounded-2xl border shadow sm:h-full bg-card p-2 sm:p-4">
            <UserStat data={users} />
            <Separator className="my-2" />
            <div className="flex-1 min-h-0">
                <DataTable
                    columns={columns(setDialog)}
                    data={users}
                    pageSize={10}
                    toolbar={(table) => (
                        <div className="flex items-center gap-2">
                            <DataTableSearch table={table} column="name" placeholder="Search users..." />
                            <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ action: "create", id: null, open: true, })}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                    )}
                />
            </div>
            {
                <>
                    {dialog.action === "create" && (
                        <CreateUserDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateUserDialog open={dialog.open} userId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "reset" && dialog.id !== null && (
                        <ResetPasswordUserDialog open={dialog.open} userId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteUserDialog open={dialog.open} userId={dialog.id} onClose={closeDialog} />)}
                </>
            }
        </div>
    )
} 