"use client";

import { useState } from "react";
import DataTable from "./data-table";
import { useGetRecipes } from "../hooks/use-recipe";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Separator } from "@/common/components/ui/separator";
import CreateRecipeDialog from "./create-recipe-dialog";
import UpdateRecipeDialog from "./update-recipe-dialog";
import DeleteRecipeDialog from "./delete-recipe-dialog";
import RecipeColumns from "./columns";
import { useRouter } from "next/navigation";

export type DialogProp = {
    action: "create" | "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function RecipeView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    const { data: recipes, isLoading } = useGetRecipes();
    const router = useRouter();

    if (!recipes || isLoading) {
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
                    columns={RecipeColumns(setDialog, router)}
                    data={recipes}
                    setDialog={setDialog}
                />
            </div>
            {
                <>
                    {dialog.action === "create" && (
                        <CreateRecipeDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                </>
            }

        </div>
    );
}