"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetControlRecipes } from "../hooks/use-control-recipe";
import CreateControlRecipeDialog from "./create-control-recipe-dialog";
import DeleteControlRecipeDialog from "./delete-control-recipe-dialog";
import UpdateControlRecipeDialog from "./update-control-recipe-dialog";
import TransferControlRecipeDialog from "./transfer-control-recipe-dialog";
import ControlRecipeSkeleton from "./control-recipe-skeleton";
import FeedbackState from "@/common/components/feedback-state";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";
import columns from "./columns";

export type DialogProp = {
    action: "create" | "edit" | "delete" | "transfer" | null;
    id: number | null;
    open: boolean;
};

export default function ControlRecipeView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    const { data: controlRecipes, isLoading: controlRecipeIsLoading, isError: controlRecipeIsError } = useGetControlRecipes();
    const loading = controlRecipeIsLoading;
    const error = controlRecipeIsError;
    const router = useRouter();

    if (loading) {
        return (<ControlRecipeSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!controlRecipes) {
        return <FeedbackState variant="empty" />;
    }


    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <DataTable
                columns={columns(setDialog, router)}
                data={controlRecipes ?? []}
                rowClassName="h-40"
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="batch" placeholder="Search batches..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ open: true, action: "create", id: null })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Schedule
                        </Button>
                    </div>
                )}
            />
            {
                <>
                    {dialog.action === "create" && (
                        <CreateControlRecipeDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "transfer" && dialog.id !== null && (
                        <TransferControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                </>
            }

        </div>
    );
}