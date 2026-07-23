import { useGetSummaryByControlRecipeId } from "../hooks/use-control-recipe-sop";
import { minutesToADuration } from "@/common/utils/duration.util";
import { ClipboardList, Clock3, Package } from "lucide-react";
import DonutChart from "@/common/components/chart/donut-chart";
import { useMemo } from "react";

export default function ControlRecipeSOPSummary({ controlRecipeId }: { controlRecipeId: number }) {
    const { data, isLoading } = useGetSummaryByControlRecipeId(controlRecipeId);
    const materialChartData = useMemo(
        () =>
            data?.materials.map((material) => ({
                label: material.name,
                value: material.stdQty,
            })),
        [data?.materials]
    );
    const summaryItems = [
        {
            label: "Total Steps",
            value: data?.totalSteps ?? 0,
            icon: ClipboardList,
            iconClass: "text-blue-600",
            bgClass: "bg-blue-100",
        },
        {
            label: "Total Duration",
            value: minutesToADuration(data?.totalDuration ?? "00H:00S"),
            icon: Clock3,
            iconClass: "text-green-600",
            bgClass: "bg-green-100",
        },
        {
            label: "Total Materials",
            value: data?.totalMaterials ?? 0,
            icon: Package,
            iconClass: "text-violet-600",
            bgClass: "bg-violet-100",
        },
    ];

    if (isLoading || !data) return;

    return (
        <div className="h-full flex gap-4">
            <div className="flex flex-col flex-1 rounded-xl border bg-card  shadow-sm hover:shadow-md transition-shadow">
                <div className="border-b px-5 py-2 shrink-0">
                    <h2 className="text-lg font-semibold">
                        Summary
                    </h2>
                </div>

                <ul className="space-y-2 p-5">
                    {summaryItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.label}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-lg p-2 ${item.bgClass}`}>
                                        <Icon className={`h-5 w-5 ${item.iconClass}`} />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="text-xl font-bold">
                                    {item.value}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Pie chart */}
            <div className="flex flex-col border flex-2 shadow hover:shadow-lg rounded-lg">
                <DonutChart
                    targetSize={data.batchSize}
                    uom={data.batchSizeUom}
                    title="Materials Summary"
                    data={materialChartData ?? []} />
            </div>

        </div>

    )

}