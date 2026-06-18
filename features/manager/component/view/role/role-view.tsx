"use client";

import { useGetRoles } from "@/features/manager/hooks/use-role";
import columns from "./columns";
import DataTable from "./data-table";
import RoleStat from "./role-stat";
import { useState } from "react";

import UpdateRoleDialog from "./update-role-dialog";
import DeleteRoleDialog from "./delete-role-dialog";
import CreateRoleDialog from "./create-role-dialog";

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
        return null;
    }
    return (
        <div className="bg-card h-full border rounded-lg flex flex-col p-6 ">
            <RoleStat data={roles} isLoading={isLoading} />

            <div className="flex-1 min-h-0 my-4">
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