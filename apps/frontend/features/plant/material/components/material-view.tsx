"use client";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { PackageCheckIcon, Plus } from "lucide-react";
import { useState } from "react";
import CreateMaterialDialog from "./create-material-dialog";
import { columns } from "./columns";
import UpdateMaterialDialog from "./update-material-dialog";
import DeleteMaterialDialog from "./delete-material-dialog";
import { useGetMaterials } from "../hooks/use-materials";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { DataTable } from "@/common/components/data-table/data-table";
import MaterialSkeleton from "./material-skeleton";
import FeedbackState from "@/common/components/feedback-state";

type MaterialAction = "create" | "edit" | "delete";
export type MaterialDialogState = {
    open: boolean;
    action: MaterialAction | null;
    materialId: number | null;
};
export default function MaterialView() {
    const [dialog, setDialog] = useState<MaterialDialogState>({ open: false, action: null, materialId: null, });
    const { data: materials, isLoading: materialsLoading, isError: materialsIsError } = useGetMaterials();
    const loading = materialsLoading;
    const error = materialsIsError;
    const closeDialog = () => setDialog({ open: false, action: null, materialId: null, });

    if (loading) {
        return (<MaterialSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!materials) {
        return <FeedbackState variant="empty" />;
    }
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <PackageCheckIcon className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">Materials</h1>
                        <p className="text-sm text-muted-foreground">Manage process materials associated with equipment.</p>
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
            <DataTable
                columns={columns(setDialog)}
                data={materials ?? []}
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="name" placeholder="Search materials..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ open: true, action: "create", materialId: null })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Material
                        </Button>
                    </div>
                )}
            />
            {
                <>
                    {dialog.action === "create" && (
                        <CreateMaterialDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.materialId !== null && (
                        <UpdateMaterialDialog open={dialog.open} materialId={dialog.materialId} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.materialId !== null && (
                        <DeleteMaterialDialog open={dialog.open} materialId={dialog.materialId} onClose={closeDialog} />)}
                </>
            }
        </div>
    );
}