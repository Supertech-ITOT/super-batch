"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gauge, Plus } from "lucide-react";
import { useState } from "react";
import CreateParameterDialog from "../../menu-dialog/parameter/create-parameter-dialog";
import DataTable from "./data-table";
import { useGetParameters } from "@/features/plant/hooks/use-parameters";
import { columns } from "./columns";
import UpdateParameterDialog from "../../menu-dialog/parameter/update-parameter-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteParameterDialog from "../../menu-dialog/parameter/delete-parameter-dialog";

type ParameterAction = "create" | "edit" | "delete";
export type ParameterDialogState = {
    open: boolean;
    action: ParameterAction | null;
    parameterId: number | null;
};
export default function ParameterView() {
    const [dialog, setDialog] = useState<ParameterDialogState>({ open: false, action: null, parameterId: null, });
    const { data: parameters, isLoading: parametersLoading } = useGetParameters();
    const loading = parametersLoading || !parameters;
    const closeDialog = () =>
        setDialog({ open: false, action: null, parameterId: null, });

    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }
    return (
        <div className="flex-1 rounded-lg border bg-card p-4 flex-col">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Gauge className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Parameters</h1>
                        <p className="text-sm text-muted-foreground">Manage process parameters associated with equipment.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button onClick={() => setDialog({ open: true, action: "create", parameterId: null })}>
                        <Plus className="size-5!" />
                        Add Parameters
                    </Button>
                    {
                        <>
                            {dialog.action === "create" && (
                                <CreateParameterDialog open onClose={closeDialog} />)}
                            {dialog.action === "edit" && dialog.parameterId !== null && (
                                <UpdateParameterDialog open={dialog.open} parameterId={dialog.parameterId} onClose={closeDialog} />)}
                            {dialog.action === "delete" && dialog.parameterId !== null && (
                                <DeleteParameterDialog open={dialog.open} parameterId={dialog.parameterId} onClose={closeDialog} />)}
                        </>
                    }
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={parameters}
                />
            </div>
        </div>
    );
}