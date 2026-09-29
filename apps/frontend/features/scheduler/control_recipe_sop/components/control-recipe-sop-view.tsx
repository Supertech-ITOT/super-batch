"use client";
import { useEffect, useState } from "react";
import { useGetControlRecipeSOPsByControlRecipeId, useMoveDownControlRecipeSOP, useMoveUpControlRecipeSOP } from "../hooks/use-control-recipe-sop";
import columns from "./columns";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetControlRecipeById } from "../../control_recipe/hooks/use-control-recipe";
import { controlRecipeSOPActionType, ControlRecipeSOPDialogType, ControlRecipeSOPResponse } from "../types/control_recipe-sop-types";
import ControlRecipeSOPInfo from "./control-recipe-sop-info";
import ControlRecipeSOPSummary from "./control-recipe-sop-summary";
import ControlRecipeSOPDeleteDialog from "./control-recipe-sop-delete-dialog";
import ControlRecipeSOPDialog from "./control-recipe-sop-dialog";
import { ControlRecipeStatus } from "../../control_recipe/types/control-recipe.types";
import { ControlRecipeSOPSkeleton } from "./control-recipe-sop-skeleton";
import FeedbackState from "@/common/components/feedback-state";
import { ChevronsDown, ChevronsUp, CornerLeftDown, CornerLeftUp, Plus, SquarePen, Trash } from "lucide-react";
import { DataTable } from "@/common/components/data-table/data-table";



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

    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);


    useEffect(() => {
        setDialog((prev) => ({ ...prev, controlRecipeId: controlRecipeId, stepNo: nextStepNo, }));
    }, [controlRecipeSOP, controlRecipeId, nextStepNo]);
    const handleClose = () => {
        setDialog({ controlRecipeId: controlRecipeId, action: "create" });
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
        <div className="flex min-w-0 flex-col gap-2 rounded-2xl border bg-card p-2 shadow sm:gap-4 sm:p-4">
            <ControlRecipeSOPInfo controlRecipe={controlRecipe} />

            {/* Main Content */}
            <div className="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden sm:gap-4 lg:h-[calc(100dvh-300px)] lg:flex-row">
                {/* Table */}
                <div className="flex h-[60dvh] min-h-0 min-w-0 w-full flex-1 overflow-hidden lg:h-full">
                    <DataTable
                        columns={columns}
                        data={controlRecipeSOP}
                        rowClassName="h-15"
                        onRowClick={(r) => setSelectedRowId(r.id)}
                        isRowSelected={(r) => r.id === selectedRowId}
                        contextMenu={
                            !hideDialog
                                ? {
                                    label: "Action",
                                    items: [
                                        {
                                            label: "Add",
                                            icon: Plus,
                                            onClick: (row) => handleAction("create", row),
                                        },
                                        {
                                            label: "Insert Above",
                                            icon: CornerLeftUp,
                                            onClick: (row) => handleAction("insert-above", row),
                                        },
                                        {
                                            label: "Insert Below",
                                            icon: CornerLeftDown,
                                            onClick: (row) => handleAction("insert-below", row),
                                        },
                                        {
                                            label: "Move Up",
                                            icon: ChevronsUp,
                                            onClick: (row) => handleAction("move-up", row),
                                        },
                                        {
                                            label: "Move Down",
                                            icon: ChevronsDown,
                                            onClick: (row) => handleAction("move-down", row),
                                        },
                                        {
                                            label: "Edit",
                                            icon: SquarePen,
                                            onClick: (row) => handleAction("edit", row),
                                        },
                                        {
                                            label: "Delete",
                                            icon: Trash,
                                            variant: "destructive",
                                            onClick: (row) => handleAction("delete", row),
                                        },
                                    ],
                                }
                                : undefined
                        }
                    />
                </div>

                {/* Dialog */}
                {!hideDialog && (
                    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border shadow lg:h-full lg:w-auto lg:max-w-md lg:flex-none">
                        <ControlRecipeSOPDialog
                            action={dialog.action}
                            controlRecipeId={controlRecipeId}
                            stepNo={dialog.action === "create" ? nextStepNo : dialog.stepNo}
                            controlRecipeSOPId={dialog.controlRecipeSOPId}
                            unitId={controlRecipe.unit.id}
                            recipeQuantityType={controlRecipe.unit.recipeQuantityType}
                        />

                        {dialog.action === "delete" && dialog.controlRecipeSOPId && (
                            <ControlRecipeSOPDeleteDialog
                                open
                                id={dialog.controlRecipeSOPId}
                                controlRecipeId={controlRecipeId}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="min-h-0 shrink-0">
                <ControlRecipeSOPSummary controlRecipeId={controlRecipeId} />
            </div>
        </div>
    );
}