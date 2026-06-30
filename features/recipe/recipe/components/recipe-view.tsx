import RecipeDialog from "./recipe-dialog";
import RecipeInfo from "./recipe-info";

export default function RecipeView({ id }: { id: number }) {
    return (
        <div className="flex-1 gap-4 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
            <RecipeInfo id={id} />

            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                <div className="flex w-full flex-col gap-4 min-h-0">
                    {/* Table */}
                    <div className="flex-3 min-h-0 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full h-120"></div>
                    </div>

                    {/* Summary */}
                    <div className="2xl:flex-1 min-h-0 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full h-30"></div>
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-w-1/4 xl:h-full min-h-120 border shadow hover:shadow-lg rounded-lg overflow-hidden">
                    <RecipeDialog />
                </div>
            </div>
        </div>
    );
}