"use client";
import { useEffect, useState } from "react";
import { useGetRecipeSOPsByRecipeId, useMoveDownRecipeSOP, useMoveUpRecipeSOP } from "../hooks/use-recipe-sop";
import columns from "./columns";
import RecipeInfo from "./recipe-sop-info";
import { RecipeSOPResponse } from "../types/recipe-sop-types";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetRecipeById } from "../../recipe/hooks/use-recipe";
import RecipeSOPDialog from "./recipe-sop-dialog";
import RecipeSOPDeleteDialog from "./recipe-sop-delete-dialog";
import RecipeSOPSummary from "./recipe-sop-summary";
import FeedbackState from "@/common/components/feedback-state";
import { RecipeSOPSkeleton } from "./recipe-sop-skeleton";
import { ChevronsDown, ChevronsUp, CornerLeftDown, CornerLeftUp, Plus, SquarePen, Trash } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";

export type recipeSOPActionType = "create" | "insert-below" | "insert-above" | "edit" | "move-up" | "move-down" | "delete";
export type RecipeSOPDialogType = {
    recipeSOPId?: number;
    recipeId: number;
    stepNo?: number;
    action: recipeSOPActionType;
}

export default function RecipeSOPView({ recipeId }: { recipeId: number }) {
    const { data: recipe, isLoading: recipeIsLoading, isError: recipeIsError } = useGetRecipeById(recipeId);
    const { data: recipeSOP, isLoading: recipeSOPIsLoading, isError: recipeSopIsError } = useGetRecipeSOPsByRecipeId(recipeId);
    const error = recipeIsError || recipeSopIsError;
    const loading = recipeIsLoading || recipeSOPIsLoading;
    const nextStepNo = (recipeSOP?.length ?? 0) + 1;
    const [dialog, setDialog] = useState<RecipeSOPDialogType>({ recipeId: recipeId, action: "create", stepNo: nextStepNo });

    const { mutateAsync: moveUp } = useMoveUpRecipeSOP();
    const { mutateAsync: moveDown } = useMoveDownRecipeSOP();

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
    if (loading) {
        return (<RecipeSOPSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!recipeSOP || !recipe) {
        return <FeedbackState variant="empty" />;
    }
    return (
        <div className="flex flex-col rounded-2xl border shadow bg-card p-2 sm:p-4 flex-1 gap-2">
            <RecipeInfo recipe={recipe} />
            <div className="flex flex-col gap-2 sm:gap-4 min-w-0 2xl:flex-row 2xl:h-[calc(100dvh-15rem)]">
                <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-4 h-full">
                    {/* Table */}
                    <div className="flex-4 min-w-0  min-h-0">
                        <DataTable
                            columns={columns}
                            data={recipeSOP}
                            rowClassName="h-15"
                            contextMenu={{
                                label: "Action",
                                items: [
                                    {
                                        label: "Add",
                                        icon: Plus,
                                        onClick: row => handleAction("create", row),
                                    },
                                    {
                                        label: "Insert Above",
                                        icon: CornerLeftUp,
                                        onClick: row => handleAction("insert-above", row),
                                    },
                                    {
                                        label: "Insert Below",
                                        icon: CornerLeftDown,
                                        onClick: row => handleAction("insert-below", row),
                                    },
                                    {
                                        label: "Move Up",
                                        icon: ChevronsUp,
                                        onClick: row => handleAction("move-up", row),
                                    },
                                    {
                                        label: "Move Down",
                                        icon: ChevronsDown,
                                        onClick: row => handleAction("move-down", row),
                                    },
                                    {
                                        label: "Edit",
                                        icon: SquarePen,
                                        onClick: row => handleAction("edit", row),
                                    },
                                    {
                                        label: "Delete",
                                        icon: Trash,
                                        variant: "destructive",
                                        onClick: row => handleAction("delete", row),
                                    },
                                ],
                            }}
                        />
                    </div>

                    {/* Summary */}
                    <div className="flex-2  min-w-0 min-h-0">
                        <RecipeSOPSummary recipeId={recipeId} />
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4  2xl:shrink-0 border shadow hover:shadow-lg rounded-2xl overflow-hidden flex-1 min-h-100 h-full ">
                    <RecipeSOPDialog action={dialog.action} recipeId={recipeId} stepNo={dialog.stepNo} recipeSOPId={dialog.recipeSOPId} unitId={recipe.unitRecipeResponse.id} recipeQuantityType={recipe.unitRecipeResponse.recipeQuantityType} />
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