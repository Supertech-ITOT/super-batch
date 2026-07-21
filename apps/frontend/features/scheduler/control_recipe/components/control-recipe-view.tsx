"use client";

import { useState } from "react";
import DataTable from "./data-table";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Separator } from "@/common/components/ui/separator";
import ControlRecipeColumns from "./columns";
import { useRouter } from "next/navigation";
import { useGetControlRecipes } from "../hooks/use-control-recipe";
import CreateControlRecipeDialog from "./create-control-recipe-dialog";
import DeleteControlRecipeDialog from "./delete-control-recipe-dialog";
import UpdateControlRecipeDialog from "./update-control-recipe-dialog";
// import UpdateControlRecipeDialog from "./update-control-recipe-dialog";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function ControlRecipeView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    const { data: controlRecipes, isLoading } = useGetControlRecipes();
    const router = useRouter();

    if (!controlRecipes || isLoading) {
        return (

            <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-80" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex-1 min-h-0">
                    <Skeleton className="h-full w-full rounded-lg" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={ControlRecipeColumns(setDialog, router)}
                    data={controlRecipes}
                    setDialog={setDialog}
                />
            </div>
            {
                <>
                    {dialog.action === "create" && (
                        <CreateControlRecipeDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                </>
            }

        </div>
    );
}