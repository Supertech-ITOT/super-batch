import { ColumnDef } from "@tanstack/react-table";
import { RecipeHeaderResponse } from "../types/recipe-header.types";
import { Button } from "@/common/components/ui/button";
import { DialogProp } from "./recipe-header-view";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/common/components/ui/badge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const columns = (setDialog: React.Dispatch<React.SetStateAction<DialogProp>>, router: AppRouterInstance): ColumnDef<RecipeHeaderResponse>[] => [
    {
        accessorKey: "name",
        header: "Recipe Name",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div
                className="max-w-sm wrap-break-word whitespace-normal line-clamp-2"
                title={row.original.description}
            >
                {row.original.description}
            </div>
        ),
    },
    {
        id: "batchSize",
        header: "Batch Size",
        cell: ({ row }) => {
            const batchSize = row.original.batchSize;
            const uom = "kg";
            return `${batchSize} ${uom}`.trim();
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    className={`flex items-center gap-2 border font-semibold ${status === "RELEASED"
                        ? "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800"
                        : "text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
                        }`}
                >
                    <div
                        className={`h-2 w-2 rounded-full ${status === "RELEASED"
                            ? "bg-green-500"
                            : "bg-gray-500"
                            }`}
                    />
                    {status === "RELEASED" ? "Released" : "Unreleased"}
                </Badge>
            );
        },
    },
    {
        header: "Product",
        accessorFn: (row) =>
            row.materialRecipeHeaderResponse?.name ?? "-",
    },
    {
        header: "Unit",
        accessorFn: (row) =>
            row.unitRecipeHeaderResponse?.name ?? "-",
    },
    {
        id: "createdBy",
        header: "Created By",
        cell: ({ row }) => {
            const user = row.original.userRecipeHeaderResponse;
            if (!user) return "-";
            const initials = user.name?.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase();
            return (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {initials}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">
                            {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        id: "lastModified",
        header: "Last Modified",
        cell: ({ row }) => {
            const value = row.original.updatedAt || row.original.createdAt;

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
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/Recipe/edit?id=${recipe.id}`)}>
                        <Eye className="size-5!" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "edit", id: recipe.id, open: true, })} >
                        <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDialog({ action: "delete", id: recipe.id, open: true, })}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            );
        },
    }

];

export default columns;