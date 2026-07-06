import { ColumnDef } from "@tanstack/react-table";
import { RecipeResponse } from "../types/recipe-types";

export const columns: ColumnDef<RecipeResponse>[] = [
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
                title={row.original.message}
            >
                {row.original.message}
            </div>
        ),
    },

];

export default columns;