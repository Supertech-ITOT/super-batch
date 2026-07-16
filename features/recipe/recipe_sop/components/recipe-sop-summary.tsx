import { useGetSummaryByRecipeId } from "../hooks/use-recipe-sop";
import { minutesToDuration } from "@/common/utils/duration.util";
import { ClipboardList, Clock3, Package } from "lucide-react";
import { Separator } from "@/common/components/ui/separator";
import DonutChart from "@/common/components/chart/donut-chart";
import { useMemo } from "react";

export default function RecipeSOPSummary({ recipeId }: { recipeId: number }) {
    const { data, isLoading } = useGetSummaryByRecipeId(recipeId);
    const materialChartData = useMemo(
        () =>
            data?.materials.map((material) => ({
                label: material.name,
                value: material.stdQty,
            })),
        [data?.materials]
    );
    if (isLoading || !data) return;

    return (
        <div className="h-full flex gap-4">
            <div className="flex flex-col flex-1 rounded-xl border bg-card  shadow-sm hover:shadow-md transition-shadow">
                <div className="border-b px-5 py-2 shrink-0">
                    <h2 className="text-lg font-semibold">
                        Recipe Summary
                    </h2>
                </div>

                <ul className="space-y-2 p-5">
                    <li className="flex items-center justify-between ">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2">
                                <ClipboardList className="h-5 w-5 text-blue-600" />
                            </div>

                            <span className="text-sm font-medium text-muted-foreground">
                                Total Steps
                            </span>
                        </div>

                        <span className="text-xl font-bold">
                            {data.totalSteps}
                        </span>
                    </li>

                    <li className="flex items-center justify-between ">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2">
                                <Clock3 className="h-5 w-5 text-green-600" />
                            </div>

                            <span className="text-sm font-medium text-muted-foreground">
                                Total Duration
                            </span>
                        </div>

                        <span className="text-xl font-bold">
                            {minutesToDuration(data.totalDuration)}
                        </span>
                    </li>

                    <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-violet-100 p-2">
                                <Package className="h-5 w-5 text-violet-600" />
                            </div>

                            <span className="text-sm font-medium text-muted-foreground">
                                Total Materials
                            </span>
                        </div>

                        <span className="text-xl font-bold">
                            {data.totalMaterials}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Pie chart */}
            <div className="flex flex-col border flex-1 shadow hover:shadow-lg rounded-lg">
                <DonutChart
                    title="Materials Summary"
                    data={materialChartData ?? []} />
            </div>

        </div>

    )

}