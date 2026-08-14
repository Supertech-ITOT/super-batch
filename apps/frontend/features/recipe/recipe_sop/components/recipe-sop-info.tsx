"use client"

import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { Circle, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteRecipeDialog from "../../recipe/components/delete-recipe-dialog";
import UpdateRecipeDialog from "../../recipe/components/update-recipe-dialog";
import { RecipeResponse, RecipeStatus, RecipeStatusBadgeStyles } from "../../recipe/types/recipe.types";

export type DialogProp = {
    action: "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function RecipeSOPInfo({ recipe }: { recipe: RecipeResponse }) {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    return (
        <div className="flex lg:flex-row flex-col justify-between gap-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl leading-6 sm:text-2xl font-semibold text-primary line-clamp-2">{recipe.name}</h1>
                <p className="max-w-5xl text-xs sm:text-sm leading-3.5 text-justify text-muted-foreground">
                    {recipe.description}
                </p>
                <div className="flex gap-1 overflow-x-auto scrollbar-none">
                    <Badge
                        className={`flex items-center gap-2 border font-semibold ${RecipeStatusBadgeStyles[recipe.status]}`}
                    >
                        <Circle className={`h-2 w-2 fill-current`} />
                        {recipe.status === RecipeStatus.RELEASED ? "Released" : "UnReleased"}
                    </Badge>
                    <Badge variant={"outline"} >Unit: {recipe.unitRecipeResponse.name} - [{recipe.unitRecipeResponse.code}]</Badge>
                    <Badge variant={"outline"} >Batch Size: {recipe.batchSize} KG</Badge>
                </div>
            </div>
            <div className="flex gap-1 grow sm:grow-0 sm:w-100">
                <Button className="flex-1! text-white" onClick={() => setDialog({ action: "edit", id: recipe.id, open: true, })} >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </Button>
                <Button className="flex-1! text-white" variant="destructive" onClick={() => setDialog({ action: "delete", id: recipe.id, open: true, })}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </div>
            {
                <>
                    {dialog.action === "edit" && dialog.id !== null && (
                        <UpdateRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} />)}
                    {dialog.action === "delete" && dialog.id !== null && (
                        <DeleteRecipeDialog open={dialog.open} recipeId={dialog.id} onClose={closeDialog} redirect />)}
                </>
            }

        </div>
    )
}