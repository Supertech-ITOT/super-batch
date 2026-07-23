import { useCallback, useMemo } from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { getChartColorByText } from "@/common/utils/color.util";
import { UomResponse } from "@/features/plant/common/types/uom.types";

type DonutChartData = {
    label: string;
    value: number;
    fill?: string;
};

type DonutChartProps = {
    title?: string;
    data: DonutChartData[];
    targetSize: number;
    uom: UomResponse;

};

export default function DonutChart({ data, targetSize, uom }: DonutChartProps) {
    const chartData = useMemo(
        () => data.map((item) => ({
            ...item,
            fill: item.fill ?? getChartColorByText(item.label),
        })),
        [data]
    );

    const totalValue = useMemo(() => chartData.reduce((sum, item) => sum + item.value, 0),
        [chartData]
    );

    const totalUsedKg = useMemo(() => {
        return chartData.reduce((sum, item) => {
            const qtyKg =
                uom.symbol === "%"
                    ? (item.value / 100) * targetSize
                    : item.value;

            return sum + qtyKg;
        }, 0);
    }, [chartData, targetSize, uom.symbol]);

    const remainingQty = Math.max(targetSize - totalUsedKg, 0);

    const renderTooltip = useCallback(
        ({ active, payload }: any) => {
            if (!active || !payload?.length) return null;
            const item = payload[0].payload;
            const qty = uom.symbol === "%" ? (item.value * targetSize) / 100 : item.value;
            const percentage = uom.symbol === "%" ? item.value : (item.value / targetSize) * 100;
            return (
                <div className="relative min-w-52 overflow-hidden rounded-xl border border-border/50 bg-background/75 shadow-xl backdrop-blur-xl">
                    <div
                        className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-30 blur-3xl"
                        style={{ backgroundColor: item.fill }}
                    />
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b px-4 py-3">
                        <span
                            className="h-3.5 w-3.5 rounded-full ring-2 ring-background"
                            style={{ backgroundColor: item.fill }}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">Material</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Quantity</span>
                            <span
                                className="rounded-md px-2 py-1 text-sm font-semibold"
                                style={{ backgroundColor: `${item.fill}20`, color: item.fill, }}
                            >
                                {qty.toFixed(2)} KG
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Contribution</span>
                            <span className="text-sm font-semibold text-foreground">{percentage.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            );
        },
        [targetSize, uom.symbol]
    );


    if (!chartData.length) {
        return (
            <div className="flex h-80 items-center justify-center rounded-xl border bg-card text-muted-foreground">
                No data available
            </div>
        );
    }



    return (
        <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
            {/* Donut Chart */}
            <div className="flex-1 min-w-0">
                <PieChart
                    responsive
                    tabIndex={-1}
                    style={{ width: "100%", height: "100%", outline: "none", }}
                >
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        innerRadius={"55%"}
                        outerRadius={"75%"}
                        paddingAngle={3}
                        cornerRadius={8}
                        stroke="none"
                        isAnimationActive
                        animationDuration={600}
                        rootTabIndex={-1}

                    >
                        <Label
                            position="left"
                            content={({ viewBox }) => {
                                if (!viewBox || !("cx" in viewBox)) return null;
                                return (
                                    <g>
                                        <text x={viewBox.cx} y={viewBox.cy - 10} textAnchor="middle" className="fill-muted-foreground text-sm">
                                            Remaining
                                        </text>
                                        <text x={viewBox.cx} y={viewBox.cy + 10} textAnchor="middle" className="fill-foreground text-lg font-bold">
                                            {remainingQty.toFixed(1)} KG
                                        </text>
                                        <text x={viewBox.cx} y={viewBox.cy + 26} textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">
                                            Target {targetSize.toFixed(1)} KG
                                        </text>
                                    </g>
                                );
                            }}
                        />


                    </Pie>
                    <Tooltip
                        cursor={false}
                        content={renderTooltip}
                    />
                </PieChart>
            </div>

            {/* Legend */}
            <div className="w-full lg:w-82 lg:shrink-0 p-2 flex flex-col justify-between ">
                <div>
                    <div className="border-b px-4 py-1.5 bg-muted/30  flex justify-between">
                        <h4 className="text-sm font-semibold">Materials</h4>
                        <strong className="text-primary font-bold">{chartData.length}</strong>
                    </div>

                    <div className="max-h-34 overflow-y-auto scrollbar-none">
                        {chartData.map((item, idx) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between gap-3 border-b px-4 py-1.5 last:border-b-0 hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="size-4 shrink-0 rounded-full text-xs flex justify-center items-center text-white"
                                        style={{ backgroundColor: item.fill }}
                                    >
                                        {idx + 1}
                                    </span>
                                    <span className="truncate text-sm" title={item.label}>{item.label}</span>
                                </div>
                                <strong className="text-sm font-semibold">{item.value} {uom.symbol.toUpperCase()}</strong>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t bg-muted/30 px-4 py-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Total</span>
                        <span className="text-primary">
                            {totalValue.toFixed(2)} {uom.symbol.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}