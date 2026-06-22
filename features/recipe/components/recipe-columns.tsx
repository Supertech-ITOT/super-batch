import { ColumnDef } from "@tanstack/react-table";
import { RecipeResponse } from "../types/recipe.types";
import { Button } from "@/common/components/ui/button";
import { DialogProp } from "./recipe-view";
import { PencilLine, Trash2 } from "lucide-react";
import { format } from "date-fns";

export const recipeColumns = (
    setDialog: React.Dispatch<React.SetStateAction<DialogProp>>
): ColumnDef<RecipeResponse>[] => [
        {
            accessorKey: "name",
            header: "Recipe Name",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "batchSize",
            header: "Batch Size",
        },
        {
            accessorKey: "batchSizeUom",
            header: "UOM",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "version",
            header: "Version",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                const value = row.original.createdAt;

                if (!value || new Date(value).getTime() === 0) {
                    return "-";
                }

                return format(new Date(value), "dd MMM yyyy hh:mm a");
            }
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At ",
            cell: ({ row }) => {
                const value = row.original.updatedAt;

                if (!value || new Date(value).getTime() === 0) {
                    return "-";
                }

                return format(new Date(value), "dd MMM yyyy hh:mm a");
            }
        },

        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const recipe = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setDialog({
                                    action: "edit",
                                    id: recipe.id,
                                    open: true,
                                })
                            }
                        >
                            <PencilLine className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setDialog({
                                    action: "delete",
                                    id: recipe.id,
                                    open: true,
                                })
                            }
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                );
            },
        }

    ];