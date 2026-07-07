import { useGetRecipeByHeaderId } from "../hooks/use-recipe";
import columns from "./columns";
import DataTable from "./data-table";
import RecipeDialog from "./recipe-dialog";
import RecipeInfo from "./recipe-info";

export default function RecipeView({ id }: { id: number }) {
    const { data, isLoading } = useGetRecipeByHeaderId(id);
    if (!data || isLoading)
        return;
    return (
        <div className="flex-1 gap-4 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
            <RecipeInfo id={id} />
            <div className="flex flex-1 min-h-0 flex-col gap-4 xl:flex-row">
                <div className="flex w-full flex-col gap-4">
                    {/* Table */}
                    <div className="xl:h-3/5 h-132 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <DataTable columns={columns} data={data} />
                    </div>

                    {/* Summary */}
                    <div className="xl:h-2/5 h-100 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full min-h-30"></div>
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 min-h-200 xl:h-full border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <RecipeDialog action="create" recipeHeaderId={id} stepNo={data.length + 1} />
                </div>
            </div>
        </div>
    );
}