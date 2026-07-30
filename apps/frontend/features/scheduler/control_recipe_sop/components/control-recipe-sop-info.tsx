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
        <div className="flex flex-wrap justify-between gap-0.5">
            <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                    <h1 className="text-2xl font-semibold">{controlRecipe.name}</h1>
                    <Badge
                        className={`flex items-center gap-2 border font-semibold ${ControlRecipeStatusBadgeStyles[controlRecipe.status]}`}
                    >
                        <Circle className={`h-2 w-2 fill-current`} />
                        {controlRecipe.status === ControlRecipeStatus.SHEDULED ? "Scheduled" : "Transferred"}
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Badge variant={"outline"} >Unit: {controlRecipe.unit.name}</Badge>
                    <Badge variant={"outline"} >Batch Size: {controlRecipe.batchSize} KG</Badge>
                </div>
                <p className="max-w-5xl text-sm leading-4 text-muted-foreground">
                    {controlRecipe.recipe.description}
                </p>
            </div>
            <div className="flex gap-2">
                <Button className="w-24" onClick={() => setDialog({ action: "edit", id: controlRecipe.id, open: true, })} >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </Button>
                <Button className="w-24" variant="destructive" onClick={() => setDialog({ action: "delete", id: controlRecipe.id, open: true, })}>
                    <Trash2 className="h-4 w-4 text-destructive" />
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