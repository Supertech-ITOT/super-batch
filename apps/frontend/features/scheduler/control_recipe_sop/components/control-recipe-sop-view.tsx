"use client";
import { useEffect, useState } from "react";
import { useGetControlRecipeSOPsByControlRecipeId, useMoveDownControlRecipeSOP, useMoveUpControlRecipeSOP } from "../hooks/use-control-recipe-sop";
import columns from "./columns";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetControlRecipeById } from "../../control_recipe/hooks/use-control-recipe";
import { ControlRecipeSOPResponse } from "../types/control_recipe-sop-types";
import ControlRecipeSOPInfo from "./control-recipe-sop-info";
import ControlRecipeSOPSummary from "./control-recipe-sop-summary";
import ControlRecipeSOPDeleteDialog from "./control-recipe-sop-delete-dialog";
import ControlRecipeSOPDialog from "./control-recipe-sop-dialog";
import { ControlRecipeStatus } from "../../control_recipe/types/control-recipe.types";
import { ControlRecipeSOPSkeleton } from "./control-recipe-sop-skeleton";
import FeedbackState from "@/common/components/feedback-state";
import { ChevronsDown, ChevronsUp, CornerLeftDown, CornerLeftUp, Plus, SquarePen, Trash } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";

export type controlRecipeSOPActionType = "create" | "insert-below" | "insert-above" | "edit" | "move-up" | "move-down" | "delete";
export type ControlRecipeSOPDialogType = {
    controlRecipeSOPId?: number;
    controlRecipeId: number;
    stepNo?: number;
    action: controlRecipeSOPActionType;
}

export default function ControlRecipeSOPView({ controlRecipeId }: { controlRecipeId: number }) {
    const { data: controlRecipe, isLoading: controlRecipeIsLoading, isError: controlRecipeIsError } = useGetControlRecipeById(controlRecipeId);
    const { data: controlRecipeSOP, isLoading: controlRecipeSOPIsLoading, isError: controlRecipeSopIsError } = useGetControlRecipeSOPsByControlRecipeId(controlRecipeId);
    const error = controlRecipeIsError || controlRecipeSopIsError;
    const loading = controlRecipeIsLoading || controlRecipeSOPIsLoading;
    const hideDialog = controlRecipe?.status === ControlRecipeStatus.TRANSFERRED;
    const nextStepNo = (controlRecipeSOP?.length ?? 0) + 1;
    const [dialog, setDialog] = useState<ControlRecipeSOPDialogType>({ controlRecipeId: controlRecipeId, action: "create", stepNo: nextStepNo });

    const { mutateAsync: moveUp } = useMoveUpControlRecipeSOP();
    const { mutateAsync: moveDown } = useMoveDownControlRecipeSOP();

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
    if (loading) {
        return (<ControlRecipeSOPSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!controlRecipeSOP || !controlRecipe) {
        return <FeedbackState variant="empty" />;
    }
    return (
        <div className="flex flex-col rounded-2xl border shadow bg-card p-2 sm:p-4 flex-1 gap-2">
            <ControlRecipeSOPInfo controlRecipe={controlRecipe} />
            <div className="flex flex-col gap-2 sm:gap-4 min-w-0 2xl:flex-row 2xl:h-[calc(100dvh-15rem)]">
                <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-4 h-full">
                    {/* Table */}
                    <div className="flex-4 min-w-0  min-h-0">
                        <DataTable
                            columns={columns}
                            data={controlRecipeSOP}
                            rowClassName="h-15"
                            contextMenu={!hideDialog ? {
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
                            } : undefined}
                        />
                    </div>

                    {/* Summary */}
                    <div className="flex-2  min-w-0 min-h-0">
                        <ControlRecipeSOPSummary controlRecipeId={controlRecipeId} />
                    </div>
                </div>

                {/* Dialog */}
                {!hideDialog && <div className="min-w-1/4  2xl:shrink-0 border shadow hover:shadow-lg rounded-2xl overflow-hidden flex-1 min-h-100 h-full ">
                    <ControlRecipeSOPDialog action={dialog.action} controlRecipeId={controlRecipeId} stepNo={dialog.stepNo} controlRecipeSOPId={dialog.controlRecipeSOPId} unitId={controlRecipe.unit.id} batchSize={controlRecipe.batchSize} />
                    {dialog.action === "delete" && dialog.controlRecipeSOPId &&
                        (
                            <ControlRecipeSOPDeleteDialog open id={dialog.controlRecipeSOPId} controlRecipeId={controlRecipeId} onClose={handleClose} />
                        )
                    }
                </div>}
            </div>
        </div>
    );
}