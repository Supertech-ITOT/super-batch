import { useEffect, useState } from "react";
import { useGetRecipeSOPsByRecipeId, useMoveDownRecipeSOP, useMoveUpRecipeSOP } from "../hooks/use-recipe-sop";
import columns from "./columns";
import DataTable from "./data-table";
import RecipeDialog, { recipeSOPActionType, RecipeSOPDialogType } from "./recipe-sop-dialog";
import RecipeInfo from "./recipe-sop-info";
import { RecipeSOPResponse } from "../types/recipe-sop-types";
import { toast } from "sonner";
import RecipeDeleteDialog from "./recipe-sop-delete-dialog";
import { showApiError } from "@/common/lib/show-api-error";

export default function RecipeSOPView({ recipeId }: { recipeId: number }) {
    const { data, isLoading } = useGetRecipeSOPsByRecipeId(recipeId);
    const { mutateAsync: moveUp } = useMoveUpRecipeSOP();
    const { mutateAsync: moveDown } = useMoveDownRecipeSOP();
    const nextStepNo = (data?.length ?? 0) + 1;
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
                setDialog({ recipeId: row.id, recipeSOPId: recipeId, stepNo: row.stepNo, action, });
                return;
            }
        }
    };
    if (!data || isLoading)
        return;
    return (
        <div className="gap-4 rounded-lg border shadow h-screen p-4 overflow-y-auto scrollbar-none flex flex-col bg-card">
            <RecipeInfo recipeId={recipeId} />
            <div className="flex flex-col gap-4 xl:flex-row xl:flex-1 xl:min-h-0">
                <div className="flex w-full flex-col gap-4">
                    {/* Table */}
                    <div className="flex-4 min-h-0 bg-card border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <DataTable columns={columns} data={data} onAction={handleAction} />
                    </div>

                    {/* Summary */}
                    <div className="flex-1 min-h-32 border bg-card shadow hover:shadow-lg rounded-lg overflow-hidden">

                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 xl:h-full xl:shrink-0 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <RecipeDialog action={dialog.action} recipeId={recipeId} stepNo={dialog.stepNo} recipeSOPId={dialog.recipeId} />
                    {dialog.action === "delete" && dialog.recipeId &&
                        (
                            <RecipeDeleteDialog open id={dialog.recipeId} recipeId={dialog.recipeId} onClose={handleClose} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}