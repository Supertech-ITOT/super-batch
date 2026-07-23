import { useEffect, useState } from "react";
import { useGetControlRecipeSOPsByControlRecipeId, useMoveDownControlRecipeSOP, useMoveUpControlRecipeSOP } from "../hooks/use-control-recipe-sop";
import columns from "./columns";
import DataTable from "./data-table";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetControlRecipeById } from "../../control_recipe/hooks/use-control-recipe";
import { ControlRecipeSOPResponse } from "../types/control_recipe-sop-types";
import ControlRecipeSOPInfo from "./control-recipe-sop-info";
import ControlRecipeSOPSummary from "./control-recipe-sop-summary";
import ControlRecipeSOPDeleteDialog from "./control-recipe-sop-delete-dialog";
import ControlRecipeSOPDialog from "./control-recipe-sop-dialog";

export type controlRecipeSOPActionType = "create" | "insert-below" | "insert-above" | "edit" | "move-up" | "move-down" | "delete";
export type ControlRecipeSOPDialogType = {
    controlRecipeSOPId?: number;
    controlRecipeId: number;
    stepNo?: number;
    action: controlRecipeSOPActionType;
}

export default function ControlRecipeSOPView({ controlRecipeId }: { controlRecipeId: number }) {
    const { data: controlRecipe, isLoading: controlRecipeIsLoading } = useGetControlRecipeById(controlRecipeId);
    const { data: controlRecipeSOP, isLoading: controlRecipeSOPIsLoading } = useGetControlRecipeSOPsByControlRecipeId(controlRecipeId);
    const loading = controlRecipeIsLoading || controlRecipeSOPIsLoading;

    const { mutateAsync: moveUp } = useMoveUpControlRecipeSOP();
    const { mutateAsync: moveDown } = useMoveDownControlRecipeSOP();
    const nextStepNo = (controlRecipeSOP?.length ?? 0) + 1;
    const [dialog, setDialog] = useState<ControlRecipeSOPDialogType>({ controlRecipeId: controlRecipeId, action: "create", stepNo: nextStepNo });
    useEffect(() => {
        setDialog((prev) => ({ ...prev, controlRecipeId: controlRecipeId, stepNo: nextStepNo, }));
    }, [controlRecipeId, nextStepNo]);
    const handleClose = () => {
        setDialog({ controlRecipeId: controlRecipeId, action: "create", stepNo: nextStepNo, });
    }
    const handleAction = async (action: controlRecipeSOPActionType, row: ControlRecipeSOPResponse) => {
        switch (action) {
            case "move-up": {
                try {
                    const res = await moveUp({ id: row.id, controlRecipeId: controlRecipeId, });
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
                    const res = await moveDown({ id: row.id, controlRecipeId: controlRecipeId, });
                    toast.success(res.message ?? "Moved down successfully.");
                } catch (err) {
                    showApiError(err);
                } finally {
                    return;
                }
            }
            case "create": {
                setDialog({ action, stepNo: nextStepNo, controlRecipeId: controlRecipeId });
                return;
            }
            case "insert-below": {
                setDialog({ controlRecipeId: controlRecipeId, stepNo: row.stepNo + 1, action, controlRecipeSOPId: row.id });
                return;
            }
            default: {
                setDialog({ controlRecipeId: controlRecipeId, controlRecipeSOPId: row.id, stepNo: row.stepNo, action, });
                return;
            }
        }
    };
    if (!controlRecipeSOP || loading || !controlRecipe)
        return;
    return (
        <div className="gap-4 rounded-lg border shadow h-screen p-4 overflow-y-auto scrollbar-none flex flex-col bg-card">
            <ControlRecipeSOPInfo controlRecipe={controlRecipe} />
            <div className="flex flex-col gap-4 min-w-0 2xl:flex-row 2xl:flex-1 2xl:min-h-0">
                <div className="flex w-full min-w-0 flex-col gap-4">
                    {/* Table */}
                    <div className="flex-4 min-w-0 min-h-0 bg-card border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <DataTable columns={columns} data={controlRecipeSOP} onAction={handleAction} />
                    </div>

                    {/* Summary */}
                    <div className="flex-1 min-h-56  overflow-hidden">
                        <ControlRecipeSOPSummary controlRecipeId={controlRecipeId} />
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 2xl:h-full 2xl:shrink-0 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <ControlRecipeSOPDialog action={dialog.action} controlRecipeId={controlRecipeId} stepNo={dialog.stepNo} controlRecipeSOPId={dialog.controlRecipeSOPId} unitId={controlRecipe.recipe.unit.id} batchSizeUom={controlRecipe.recipe.unit.batchSizeUom.symbol} />
                    {dialog.action === "delete" && dialog.controlRecipeSOPId &&
                        (
                            <ControlRecipeSOPDeleteDialog open id={dialog.controlRecipeSOPId} controlRecipeId={controlRecipeId} onClose={handleClose} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}