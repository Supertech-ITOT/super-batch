"use client"

import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteRecipeDialog from "../../recipe/components/delete-recipe-dialog";
import UpdateRecipeDialog from "../../recipe/components/update-recipe-dialog";
import { RecipeResponse, RecipeStatus } from "../../recipe/types/recipe.types";

export type DialogProp = {
    action: "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function RecipeSOPInfo({ recipe }: { recipe: RecipeResponse }) {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    return (
        <div className="flex flex-wrap justify-between gap-0.5">
            <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                    <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                    <Badge
                        className={`flex items-center gap-2 border font-semibold ${recipe.status === RecipeStatus.RELEASED
                            ? "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800"
                            : "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
                            }`}
                    >
                        <div
                            className={`h-2 w-2 rounded-full ${recipe.status === RecipeStatus.RELEASED
                                ? "bg-green-500"
                                : "bg-gray-500"
                                }`}
                        />
                        {recipe.status === RecipeStatus.RELEASED ? "Released" : "Unreleased"}
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Badge variant={"outline"} >Unit: {recipe.unitRecipeResponse.name} - [{recipe.unitRecipeResponse.code}]</Badge>
                    <Badge variant={"outline"} >Batch Size: {recipe.batchSize} KG</Badge>
                    <Badge variant={"outline"} >Batch Size Uom: {recipe.unitRecipeResponse.batchSizeUom.symbol.toUpperCase()}</Badge>
                </div>
                <p className="max-w-5xl text-sm leading-4 text-muted-foreground">
                    {recipe.description}
                </p>
            </div>
            <div className="flex gap-2">
                <Button className="w-24" onClick={() => setDialog({ action: "edit", id: recipe.id, open: true, })} >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </Button>
                <Button className="w-24" variant="destructive" onClick={() => setDialog({ action: "delete", id: recipe.id, open: true, })}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    Delete
                </Button>
                {
                    <>
                        {dialog.action === "edit" && dialog.id !== null && (
                            <UpdateRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                        {dialog.action === "delete" && dialog.id !== null && (
                            <DeleteRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} redirect />)}
                    </>
                }
            </div>

        </div>
    )
}