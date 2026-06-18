"use client";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { PackageCheckIcon, Plus } from "lucide-react";
import { useState } from "react";
import CreateMaterialDialog from "../../menu-dialog/material/create-material-dialog";
import DataTable from "./data-table";
import { useGetMaterials } from "@/features/plant/hooks/use-materials";
import { columns } from "./columns";
import UpdateMaterialDialog from "../../menu-dialog/material/update-material-dialog";
import { Skeleton } from "@/common/components/ui/skeleton";
import DeleteMaterialDialog from "../../menu-dialog/material/delete-material-dialog";

type MaterialAction = "create" | "edit" | "delete";
export type MaterialDialogState = {
    open: boolean;
    action: MaterialAction | null;
    materialId: number | null;
};
export default function MaterialView() {
    const [dialog, setDialog] = useState<MaterialDialogState>({ open: false, action: null, materialId: null, });
    const { data: materials, isLoading: materialsLoading } = useGetMaterials();
    const loading = materialsLoading || !materials;
    const closeDialog = () =>
        setDialog({ open: false, action: null, materialId: null, });

    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }
    return (
        <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <PackageCheckIcon className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Materials</h1>
                        <p className="text-sm text-muted-foreground">Manage process materials associated with equipment.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button className="text-white" onClick={() => setDialog({ open: true, action: "create", materialId: null })}>
                        <Plus className="size-5!" />
                        Add Materials
                    </Button>
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
            </div>
            <Separator className="my-4" />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={materials}
                />
            </div>
        </div>
    );
}