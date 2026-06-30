"use client"

import { Badge } from "@/common/components/ui/badge";
import { useGetRecipeHeaderById } from "../../recipe_header/hooks/use-recipe-header"
import { Button } from "@/common/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteRecipeHeaderDialog from "../../recipe_header/components/delete-recipe-header-dialog";
import UpdateRecipeHeaderDialog from "../../recipe_header/components/update-recipe-header-dialog";

export type DialogProp = {
    action: "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function RecipeInfo({ id }: { id: number }) {
    const { data: recipeHeader, isLoading: recipeHeaderIsLoading } = useGetRecipeHeaderById(id);
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    const loading = !recipeHeader || recipeHeaderIsLoading;
    if (loading) return;
    return (
        <div className="flex flex-wrap justify-between">
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-semibold">{recipeHeader.name}</h1>
                <Badge
                    className={`flex items-center gap-2 border font-semibold ${recipeHeader.status === "RELEASED"
                        ? "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800"
                        : "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
                        }`}
                >
                    <div
                        className={`h-2 w-2 rounded-full ${recipeHeader.status === "RELEASED"
                            ? "bg-green-500"
                            : "bg-gray-500"
                            }`}
                    />
                    {recipeHeader.status === "RELEASED" ? "Released" : "Unreleased"}
                </Badge>
            </div>
            <div className="flex gap-2">
                <Button className="w-24" onClick={() => setDialog({ action: "edit", id: id, open: true, })} >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </Button>
                <Button className="w-24" variant="destructive" onClick={() => setDialog({ action: "delete", id: id, open: true, })}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    Delete
                </Button>
                {
                    <>
                        {dialog.action === "edit" && dialog.id !== null && (
                            <UpdateRecipeHeaderDialog open={dialog.open} recipeHeaderId={dialog.id} onClose={closeDialog} />)}
                        {dialog.action === "delete" && dialog.id !== null && (
                            <DeleteRecipeHeaderDialog open={dialog.open} recipeHeaderId={dialog.id} onClose={closeDialog} redirect />)}
                    </>
                }
            </div>

        </div>
    )
}