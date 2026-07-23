import { ColumnDef } from "@tanstack/react-table";
import { RecipeResponse, RecipeStatus, RecipeStatusBadgeStyles, } from "../types/recipe.types";
import { Button } from "@/common/components/ui/button";
import { DialogProp } from "./recipe-view";
import { Circle, Eye, PencilLine, Trash2, Package, Scale, Boxes, } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/common/components/ui/badge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getColorByText } from "@/common/utils/color.util";
import UserAvatar from "@/common/components/user-avatar";

export const columns = (
    setDialog: React.Dispatch<React.SetStateAction<DialogProp>>,
    router: AppRouterInstance
): ColumnDef<RecipeResponse>[] => [
        {
            id: "srNo",
            header: "Sr. No.",
            cell: ({ row }) => row.index + 1,
        },

        {
            id: "recipe",
            header: "Recipe",
            accessorFn: (row) => row.name,
            cell: ({ row }) => {
                const recipe = row.original;
                const status = recipe.status;

                return (
                    <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1 space-y-0.5">
                                <h3 className="truncate text-[15px] font-semibold tracking-tight text-foreground">
                                    {recipe.name}
                                </h3>

                                <p
                                    className="max-w-xl wrap-break-word whitespace-normal line-clamp-2 text-[13px] leading-5 text-muted-foreground"
                                    title={recipe.description}
                                >
                                    {recipe.description || "-"}
                                </p>
                            </div>
                            <Badge className={RecipeStatusBadgeStyles[status as keyof typeof RecipeStatusBadgeStyles]}>
                                <Circle className="size-2 fill-current" />
                                {status === RecipeStatus.RELEASED ? "Released" : "Unreleased"}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
                            <Badge
                                variant="outline"
                                className={`h-6 gap-1 px-2 text-[11px] ${getColorByText(recipe.materialRecipeResponse?.name)}`}
                            >
                                <Package />
                                {recipe.materialRecipeResponse?.name ?? "-"}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={`h-6 gap-1 px-2 text-[11px] ${getColorByText(recipe.unitRecipeResponse?.name)}`}
                            >
                                <Boxes />
                                {recipe.unitRecipeResponse?.name ?? "-"}
                            </Badge>
                            <Badge
                                variant="secondary"
                                className={`h-6 gap-1 px-2 text-[11px]`}
                            >
                                <Scale />
                                {recipe.batchSize} KG
                            </Badge>
                        </div>
                    </div>
                );
            },
        },

        {
            id: "createdBy",
            header: "Creator",
            cell: ({ row }) => {
                const user = row.original.userRecipeResponse;
                if (!user) return "-";
                return (
                    <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} />
                        <div className="flex flex-col text-left">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email} </span>
                        </div>
                    </div>
                );
            },
        },

        {
            id: "modified",
            header: "Modified",
            cell: ({ row }) => {
                const value =
                    row.original.updatedAt || row.original.createdAt;

                if (!value || new Date(value).getTime() === 0) {
                    return "-";
                }

                return format(new Date(value), "dd MMM yyyy hh:mm a");
            },
        },

        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const recipe = row.original;

                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                router.push(`/Recipe/edit?id=${recipe.id}`)
                            }
                        >
                            <Eye className="size-4" />
                        </Button>

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
                            <PencilLine className="size-4" />
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
                            <Trash2 className="size-4 text-destructive" />
                        </Button>
                    </div>
                );
            },
        },
    ];

export default columns;