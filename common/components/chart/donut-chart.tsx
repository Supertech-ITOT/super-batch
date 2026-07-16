import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Pie, PieChart, PieSectorDataItem, Sector } from "recharts";
import { getChartColorByText } from "@/common/utils/color.util";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type DonutChartData = {
    label: string;
    value: number;
    fill?: string;
};

type DonutChartProps = {
    title?: string;
    data: DonutChartData[];

};

export default function DonutChart({
    title,
    data,
}: DonutChartProps) {
    const [open, setOpen] = useState(false);

    const chartData = useMemo(
        () =>
            data.map((item) => ({
                ...item,
                fill: item.fill ?? getChartColorByText(item.label),
            })),
        [data]
    );

    if (!chartData.length) {
        return (
            <div className="flex h-80 items-center justify-center rounded-xl border bg-card text-muted-foreground">
                No data available
            </div>
        );
    }

    const renderActiveShape = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    }: PieSectorDataItem) => {
        const RADIAN = Math.PI / 180;

        const sin = Math.sin(-RADIAN * (midAngle ?? 0));
        const cos = Math.cos(-RADIAN * (midAngle ?? 0));

        const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
        const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;

        const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
        const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;

        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;

        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    dy={8}
                    textAnchor="middle"
                    fill={fill}
                    fontSize={open ? 20 : 10}
                >
                    {payload?.label}
                </text>

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />

                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={(outerRadius ?? 0) + 6}
                    outerRadius={(outerRadius ?? 0) + 10}
                    fill={fill}
                />

                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />

                <circle
                    cx={ex}
                    cy={ey}
                    r={2}
                    fill={fill}
                />

                <text
                    x={ex + (cos >= 0 ? 12 : -12)}
                    y={ey}
                    textAnchor={textAnchor}
                >
                    {value}
                </text>

                <text
                    x={ex + (cos >= 0 ? 12 : -12)}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    className="fill-muted-foreground"
                >
                    {(percent! * 100).toFixed(1)}%
                </text>
            </g>
        );
    };

    const Chart = (
        <PieChart
            responsive
            tabIndex={-1}

            style={{
                width: "100%",
                height: "100%",
                outline: "none",
            }}
        >
            <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                activeShape={renderActiveShape}
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
            />
        </PieChart>
    );

    return (
        <>
            <div className="flex h-full flex-col rounded-xl border bg-card">
                {title && (
                    <div className="flex items-center justify-between border-b px-5 py-2 shrink-0">
                        <h2 className="text-lg font-semibold">
                            {title}
                        </h2>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setOpen(true)}
                        >
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <div className="min-h-0 flex-1">
                    {Chart}
                </div>
            </div>

            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent
                    className="max-w-[60vw]! h-[60vh] p-0 overflow-hidden gap-0!">
                    <DialogHeader className="border-b px-6 py-4">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>


                    {Chart}

                </DialogContent>
            </Dialog>
        </>
    );
}