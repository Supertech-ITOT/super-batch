"use client";

import { useState } from "react";
import { useGetRecipes } from "../hooks/use-recipe";
import CreateRecipeDialog from "./create-recipe-dialog";
import UpdateRecipeDialog from "./update-recipe-dialog";
import DeleteRecipeDialog from "./delete-recipe-dialog";
import { useRouter } from "next/navigation";
import FeedbackState from "@/common/components/feedback-state";
import RecipeSkeleton from "./recipe-skeleton";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { Button } from "@/common/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";
import columns from "./columns";
import ReleaseRecipeDialog from "./release-recipe-dialog";

export type DialogProp = {
    action: "create" | "edit" | "delete" | "release" | null;
    id: number | null;
    open: boolean;
};

export default function RecipeView() {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    const { data: recipes, isLoading: recipesIsLoading, isError: recipesIsError } = useGetRecipes();
    const loading = recipesIsLoading;
    const error = recipesIsError;
    const router = useRouter();
    if (loading) {
        return (<RecipeSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!recipes) {
        return <FeedbackState variant="empty" />;
    }

    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <DataTable
                columns={columns(setDialog, router)}
                data={recipes ?? []}
                rowClassName="h-20"
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="recipe" placeholder="Search recipes..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ open: true, action: "create", id: null })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Recipe
                        </Button>
                    </div>
                )}
            />
            {
                <>
                    {dialog.action === "create" && (
                        <CreateRecipeDialog open onClose={closeDialog} />)}
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "release" && dialog.id !== null && (
                        <ReleaseRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                </>
            }

        </div>
    );
}