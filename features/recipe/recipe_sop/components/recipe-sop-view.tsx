import { useEffect, useState } from "react";
import { useGetRecipeSOPsByRecipeId, useMoveDownRecipeSOP, useMoveUpRecipeSOP } from "../hooks/use-recipe-sop";
import columns from "./columns";
import DataTable from "./data-table";
import RecipeInfo from "./recipe-sop-info";
import { RecipeSOPResponse } from "../types/recipe-sop-types";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetRecipeById } from "../../recipe/hooks/use-recipe";
import RecipeSOPDialog from "./recipe-sop-dialog";
import RecipeSOPDeleteDialog from "./recipe-sop-delete-dialog";
import RecipeSOPSummary from "./recipe-sop-summary";



export type recipeSOPActionType = "create" | "insert-below" | "insert-above" | "edit" | "move-up" | "move-down" | "delete";
export type RecipeSOPDialogType = {
    recipeSOPId?: number;
    recipeId: number;
    stepNo?: number;
    action: recipeSOPActionType;
}

export default function RecipeSOPView({ recipeId }: { recipeId: number }) {
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const { data: recipeSOP, isLoading: recipeSOPIsLoading } = useGetRecipeSOPsByRecipeId(recipeId);
    const loading = recipeIsLoading || recipeSOPIsLoading;

    const { mutateAsync: moveUp } = useMoveUpRecipeSOP();
    const { mutateAsync: moveDown } = useMoveDownRecipeSOP();
    const nextStepNo = (recipeSOP?.length ?? 0) + 1;
    const [dialog, setDialog] = useState<RecipeSOPDialogType>({ recipeId: recipeId, action: "create", stepNo: nextStepNo });
    useEffect(() => {
        setDialog((prev) => ({ ...prev, recipeId: recipeId, stepNo: nextStepNo, }));
    }, [recipeId, nextStepNo]);
    const handleClose = () => {
        setDialog({ recipeId: recipeId, action: "create", stepNo: nextStepNo, });
    }
    const handleAction = async (action: recipeSOPActionType, row: RecipeSOPResponse,) => {
        switch (action) {
            case "move-up": {
                try {
                    const res = await moveUp({ id: row.id, recipeId: recipeId, });
                    toast.success(res.message ?? "Moved up successfully.");
                }
                catch (err) {
                    showApiError(err);
                }
                finally {
                    return;
                }
            }
            case "move-down": {
                try {
                    const res = await moveDown({ id: row.id, recipeId: recipeId, });
                    toast.success(res.message ?? "Moved down successfully.");
                } catch (err) {
                    showApiError(err);
                } finally {
                    return;
                }
            }
            case "create": {
                setDialog({ action, stepNo: nextStepNo, recipeId: recipeId });
                return;
            }
            case "insert-below": {
                setDialog({ recipeId: recipeId, stepNo: row.stepNo + 1, action, recipeSOPId: row.id });
                return;
            }
            default: {
                setDialog({ recipeId: recipeId, recipeSOPId: row.id, stepNo: row.stepNo, action, });
                return;
            }
        }
    };
    if (!recipeSOP || loading || !recipe)
        return;
    return (
        <div className="gap-4 rounded-lg border shadow h-screen p-4 overflow-y-auto scrollbar-none flex flex-col bg-card">
            <RecipeInfo recipe={recipe} />
            <div className="flex flex-col gap-4 2xl:flex-row 2xl:flex-1 2xl:min-h-0">
                <div className="flex w-full flex-col gap-4">
                    {/* Table */}
                    <div className="flex-4 min-h-0 bg-card border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <DataTable columns={columns} data={recipeSOP} onAction={handleAction} />
                    </div>

                    {/* Summary */}
                    <div className="flex-1 min-h-56  overflow-hidden">
                        <RecipeSOPSummary recipeId={recipeId} />
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 2xl:h-full 2xl:shrink-0 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <RecipeSOPDialog action={dialog.action} recipeId={recipeId} stepNo={dialog.stepNo} recipeSOPId={dialog.recipeSOPId} unitId={recipe.unitRecipeResponse.id} batchSizeUom={recipe.unitRecipeResponse.batchSizeUom.symbol} />
                    {dialog.action === "delete" && dialog.recipeSOPId &&
                        (
                            <RecipeSOPDeleteDialog open id={dialog.recipeSOPId} recipeId={recipeId} onClose={handleClose} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}