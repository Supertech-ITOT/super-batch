import { ColumnDef } from "@tanstack/react-table";
import { RecipeResponse } from "../types/recipe.types";

export const recipeColumns: ColumnDef<RecipeResponse>[] = [
    {
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "createdBy",
        header: "Created By",
    },
    {
        accessorKey: "lastModified",
        header: "Last Modified",
    },
    {
        accessorKey: "action",
        header: "Action",
    },
];