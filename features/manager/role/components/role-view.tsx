"use client";

import { useGetRoles } from "@/features/manager/role/hooks/use-role";
import columns from "./columns";
import DataTable from "./data-table";
import RoleStat from "./role-stat";
import { useState } from "react";

import UpdateRoleDialog from "./update-role-dialog";
import DeleteRoleDialog from "./delete-role-dialog";
import CreateRoleDialog from "./create-role-dialog";
import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: number | null;
    open: boolean
}
export default function RoleView() {
    const { data: roles, isLoading } = useGetRoles();
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false });
    const closeDialog = () => setDialog({ open: false, id: null, action: null })
    if (!roles || isLoading) {
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
            <RoleStat data={roles} isLoading={isLoading} />
            <Separator className="my-4" />
            <div className="flex-1 min-h-0 ">
                <DataTable
                    columns={columns(setDialog)}
                    data={roles}
                    setDialog={setDialog}
                />
            </div>
            {
                <>
                    {dialog.action === "create" && (
                        <CreateRoleDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateRoleDialog open={dialog.open} roleId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteRoleDialog open={dialog.open} roleId={dialog.id} onClose={closeDialog} />)}
                </>
            }

        </div>
    )
} 