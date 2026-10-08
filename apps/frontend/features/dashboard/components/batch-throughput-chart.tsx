"use client";

import { format } from "date-fns";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { BatchThroughputResponse, InsightPeriod, PERIODS } from "../type/dashboard.types";
import { useGetBatchThroughput } from "../hook/use-dashboard";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
  }>;
  label?: string | number;
};

type ThroughputChartProps = {
  data: BatchThroughputResponse["data"];
  width: number;
};

const ThroughputTooltip = memo(({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length || label == null) {
    return null;
  }

  const completed = payload.find((item) => item.dataKey === "completed")?.value ?? 0;

  const aborted = payload.find((item) => item.dataKey === "aborted")?.value ?? 0;

  return (
    <div className="rounded-xl border bg-card/95 px-3 py-2.5 shadow-xl backdrop-blur-xl">
      <p className="mb-2 text-xs font-semibold">{format(new Date(label), "MMM d, yyyy")}</p>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-8">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" />
            Completed
          </span>
          <span className="font-semibold">{completed}</span>
        </div>

        <div className="flex items-center justify-between gap-8">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-2 rounded-full bg-destructive" />
            Aborted
          </span>
          <span className="font-semibold">{aborted}</span>
        </div>
      </div>
    </div>
  );
});

ThroughputTooltip.displayName = "ThroughputTooltip";

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let animationFrame = 0;

    const observer = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const nextWidth = Math.round(entry.contentRect.width);
        setWidth((previousWidth) => (previousWidth === nextWidth ? previousWidth : nextWidth));
      });
    });

    observer.observe(element);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [ref]);
  return width;
}

const FloatingBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const gap = 6;
  return <rect x={x} y={y} width={width} height={Math.max(0, height - gap)} rx={4} ry={4} fill={fill} />;
};

const ThroughputChart = memo(({ data, width }: ThroughputChartProps) => {
  return (
    <BarChart width={width} height={220} data={data} barCategoryGap="25%" barGap={5}>
      <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.08} />

      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        interval={0}
        tickMargin={10}
        tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }}
        tickFormatter={(date) => format(new Date(date), "MMM d")}
      />

      <YAxis
        allowDecimals={false}
        axisLine={false}
        tickLine={false}
        width={42}
        tickMargin={6}
        tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }}
      />

      <Tooltip cursor={{ fill: "currentColor", opacity: 0.04 }} content={<ThroughputTooltip />} />

      <Bar dataKey="completed" name="Completed" fill="var(--primary)" maxBarSize={20} shape={<FloatingBar />} isAnimationActive={false} />
      <Bar dataKey="aborted" name="Aborted" fill="var(--destructive)" maxBarSize={20} shape={<FloatingBar />} isAnimationActive={false} />
      <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, fontWeight: 500, paddingTop: 10 }} />
    </BarChart>
  );
});

ThroughputChart.displayName = "ThroughputChart";

export default function BatchThroughputChart() {
  const [period, setPeriod] = useState<InsightPeriod>("SEVEN_DAYS");

  const { data, isLoading } = useGetBatchThroughput(period);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const containerWidth = useElementWidth(chartContainerRef);

  const chartData = useMemo(() => data?.data ?? [], [data?.data]);

  const chartWidth = useMemo(() => {
    if (!chartData.length) {
      return containerWidth;
    }

    return Math.max(chartData.length * 50, containerWidth);
  }, [chartData.length, containerWidth]);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-primary sm:text-base">Batch Throughput</h2>

          <p className="mt-0.5 text-xs text-muted-foreground">Completed vs aborted batches</p>
        </div>

        <Select value={period} onValueChange={(value) => setPeriod(value as InsightPeriod)}>
          <SelectTrigger className="h-8 w-32 shrink-0 text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {PERIODS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div ref={chartContainerRef} className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Loading...</div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No throughput data available</div>
        ) : (
          <div
            style={{
              width: chartWidth,
              minWidth: chartWidth,
            }}
          >
            <ThroughputChart data={chartData} width={chartWidth} />
          </div>
        )}
      </div>
    </div>
  );
}
