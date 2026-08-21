"use client"

import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { Circle, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteControlRecipeDialog from "../../control_recipe/components/delete-control-recipe-dialog";
import UpdateControlRecipeDialog from "../../control_recipe/components/update-control-recipe-dialog";
import { ControlRecipeResponse, ControlRecipeStatus, ControlRecipeStatusBadgeStyles } from "../../control_recipe/types/control-recipe.types";

export type DialogProp = {
    action: "edit" | "delete" | null;
    id: number | null;
    open: boolean;
};

export default function ControlRecipeSOPInfo({ controlRecipe }: { controlRecipe: ControlRecipeResponse }) {
    const [dialog, setDialog] = useState<DialogProp>({ action: null, id: null, open: false, });
    const closeDialog = () => setDialog({ open: false, action: null, id: null, });
    return (
        <div className="flex lg:flex-row flex-col justify-between gap-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl leading-6 sm:text-2xl font-semibold text-primary line-clamp-2">{controlRecipe.name}</h1>
                <p className="max-w-5xl text-xs sm:text-sm leading-3.5 text-justify text-muted-foreground">
                    {controlRecipe.recipe.description}
                </p>
                <div className="flex gap-1 overflow-x-auto scrollbar-none">
                    <Badge
                        className={`flex items-center gap-2 border font-semibold ${ControlRecipeStatusBadgeStyles[controlRecipe.status]}`}
                    >
                        <Circle className={`h-2 w-2 fill-current`} />
                        {controlRecipe.status === ControlRecipeStatus.SCHEDULED ? "Scheduled" : "Transferred"}
                    </Badge>
                    <Badge variant={"outline"} >Unit: {controlRecipe.unit.name} - [{controlRecipe.unit.code}]</Badge>
                    <Badge variant={"outline"} >Batch Size: {controlRecipe.batchSize} KG</Badge>
                </div>
            </div>
            <div className="flex gap-1 grow sm:grow-0 sm:w-100">
                <Button className="flex-1! text-white" onClick={() => setDialog({ action: "edit", id: controlRecipe.id, open: true, })} >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </Button>
                <Button className="flex-1! text-white" variant="destructive" onClick={() => setDialog({ action: "delete", id: controlRecipe.id, open: true, })}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
                {
                    <>
                        {dialog.action === "edit" && dialog.id !== null && (
                            <UpdateControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} />)}
                        {dialog.action === "delete" && dialog.id !== null && (
                            <DeleteControlRecipeDialog open={dialog.open} controlRecipeId={dialog.id} onClose={closeDialog} redirect />)}
                    </>
                }
            </div>

        </div>
    )
}