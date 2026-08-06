"use client";

import { useGetRoles } from "@/features/manager/role/hooks/use-role";
import columns from "./columns";
import RoleStat from "./role-stat";
import { useState } from "react";

import UpdateRoleDialog from "./update-role-dialog";
import DeleteRoleDialog from "./delete-role-dialog";
import CreateRoleDialog from "./create-role-dialog";
import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useGetModules } from "../../module/hooks/use-module";
import { DataTable } from "@/common/components/data-table/data-table";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import RoleSkeleton from "./role-skeleton";
import FeedbackState from "../../../../common/components/feedback-state";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: number | null;
    open: boolean
}
export default function RoleView() {
    const { data: roles, isLoading: rolesIsLoading, isError: rolesIsError } = useGetRoles();
    const { data: modules, isLoading: modulesIsLoading, isError: modulesIsError } = useGetModules();
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false });
    const closeDialog = () => setDialog({ open: false, id: null, action: null })
    const loading = rolesIsLoading || modulesIsLoading;
    const error = rolesIsError || modulesIsError;
    if (loading) {
        return <RoleSkeleton />;
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!roles || !modules) {
        return <FeedbackState variant="empty" />;
    }
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <RoleStat totalRole={roles.length} totalModule={modules.length} />
            <Separator className="my-2" />
            <DataTable
                columns={columns(setDialog, modules.length)}
                data={roles}
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="name" placeholder="Search roles..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ action: "create", id: null, open: true, })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Role
                        </Button>
                    </div>
                )}
            />


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