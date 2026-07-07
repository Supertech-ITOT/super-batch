import { useEffect, useState } from "react";
import { useGetRecipeByHeaderId, useMoveDownRecipe, useMoveUpRecipe } from "../hooks/use-recipe";
import columns from "./columns";
import DataTable from "./data-table";
import RecipeDialog, { recipeActionType, RecipeDialogType } from "./recipe-dialog";
import RecipeInfo from "./recipe-info";
import { RecipeResponse } from "../types/recipe-types";
import { toast } from "sonner";
import RecipeDeleteDialog from "./recipe-delete-dialog";
import { showApiError } from "@/common/lib/show-api-error";

export default function RecipeView({ id }: { id: number }) {
    const { data, isLoading } = useGetRecipeByHeaderId(id);
    const { mutateAsync: moveUp } = useMoveUpRecipe();
    const { mutateAsync: moveDown } = useMoveDownRecipe();
    const nextStepNo = (data?.length ?? 0) + 1;
    const [dialog, setDialog] = useState<RecipeDialogType>({ recipeHeaderId: id, action: "create", stepNo: nextStepNo });
    useEffect(() => {
        setDialog((prev) => ({ ...prev, recipeHeaderId: id, stepNo: nextStepNo, }));
    }, [id, nextStepNo]);
    const handleClose = () => {
        setDialog({ recipeHeaderId: id, action: "create", stepNo: nextStepNo, });
    }
    const handleAction = async (action: recipeActionType, row: RecipeResponse,) => {
        switch (action) {
            case "move-up": {
                try {
                    const res = await moveUp({ id: row.id, recipeHeaderId: id, });
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
                    const res = await moveDown({ id: row.id, recipeHeaderId: id, });
                    toast.success(res.message ?? "Moved down successfully.");
                } catch (err) {
                    showApiError(err);
                } finally {
                    return;
                }
            }
            case "create": {
                setDialog({ action, stepNo: nextStepNo, recipeHeaderId: id });
                return;
            }
            case "insert-below": {
                setDialog({ recipeHeaderId: id, stepNo: row.stepNo + 1, action, recipeId: row.id });
                return;
            }
            default: {
                setDialog({ recipeId: row.id, recipeHeaderId: id, stepNo: row.stepNo, action, });
                return;
            }
        }
    };
    if (!data || isLoading)
        return;
    return (
        <div className="flex-1 gap-4 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
            <RecipeInfo id={id} />
            <div className="flex flex-1 min-h-0 flex-col gap-4 xl:flex-row">
                <div className="flex w-full flex-col gap-4">
                    {/* Table */}
                    <div className="xl:h-6/5 h-132 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <DataTable columns={columns} data={data} onAction={handleAction} />
                    </div>

                    {/* Summary */}
                    <div className="xl:h-2/5 h-100 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full min-h-30"></div>
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 min-h-200 xl:h-full border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <RecipeDialog action={dialog.action} recipeHeaderId={id} stepNo={dialog.stepNo} recipeId={dialog.recipeId} />
                    {dialog.action === "delete" && dialog.recipeId &&
                        (
                            <RecipeDeleteDialog open id={dialog.recipeId} recipeHeaderId={dialog.recipeHeaderId} onClose={handleClose} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}