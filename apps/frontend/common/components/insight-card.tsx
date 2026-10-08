"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

export type InsightStatus = "up" | "mid" | "down";
export type InsightChartType = "line" | "area" | "bar";

export type InsightExplanation = {
  title: string;
  calculation: string;
  description: string;
  improve: string[];
  benefits: string[];
};

export type InsightCardProps = {
  title: string;
  value: string;
  change: number;
  description?: string;
  icon: React.ElementType;
  status?: InsightStatus;
  chart?: number[];
  chartType?: InsightChartType;
  explanation?: InsightExplanation;
};

const STATUS_COLOR: Record<InsightStatus, string> = {
  up: "var(--primary)",
  mid: "#eab308",
  down: "var(--destructive)",
};

function MiniChart({ values, type, status }: { values: number[]; type: InsightChartType; status: InsightStatus }) {
  const color = STATUS_COLOR[status];
  const data = values.map((value) => ({ value }));

  return (
    <div className="h-12 w-24">
      <ResponsiveContainer>
        {type === "bar" ? (
          <BarChart data={data}>
            <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} maxBarSize={7} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function ExplanationPanel({ explanation }: { explanation: InsightExplanation }) {
  return (
    <div className="relative rounded-xl border bg-background p-4 shadow-xl">
      {/* Small arrow */}
      <div className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r bg-card" />

      {/* Primary glow */}
      <div className="pointer-events-none absolute -left-5 -top-5 size-20 rounded-full bg-primary/20 blur-3xl" />

      {/* Title */}
      <div className="relative mb-3">
        <p className="text-sm font-semibold tracking-tight text-primary">{explanation.title}</p>
      </div>

      {/* Calculation */}
      <div className="relative mb-3 rounded-lg border bg-card p-2.5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">Calculation</p>

        <p className="text-xs leading-relaxed">{explanation.calculation}</p>
      </div>

      {/* Description */}
      <div className="relative mb-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">What it means</p>

        <p className="text-xs leading-relaxed text-muted-foreground">{explanation.description}</p>
      </div>

      {/* How to improve */}
      {explanation.improve.length > 0 && (
        <div className="relative mb-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">How to improve</p>

          <ul className="space-y-1.5">
            {explanation.improve.map((item, index) => (
              <li key={index} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {explanation.benefits.length > 0 && (
        <div className="relative">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Benefits</p>

          <ul className="space-y-1.5">
            {explanation.benefits.map((item, index) => (
              <li key={index} className="flex gap-2 text-xs leading-relaxed">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function InsightCard({
  title,
  value,
  change,
  description = "vs previous period",
  icon: Icon,
  status = "up",
  chart = [],
  chartType = "line",
  explanation,
}: InsightCardProps) {
  const color = STATUS_COLOR[status];
  const isDown = status === "down";
  const TrendIcon = isDown ? TrendingDown : TrendingUp;

  return (
    <div className="group relative">
      {/* Card */}
      <div className="relative flex min-h-0 overflow-hidden rounded-2xl border bg-background/60 p-3.5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
        {/* Status glow */}
        <div
          className="pointer-events-none absolute -bottom-5 -right-5 size-20 rounded-full blur-3xl"
          style={{
            backgroundColor: color,
            opacity: 0.2,
          }}
        />
        {/* Chart */}
        {chart.length > 0 && (
          <div className="pointer-events-none absolute bottom-2 right-2">
            <MiniChart values={chart} type={chartType} status={status} />
          </div>
        )}
        {/* Main content */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-card" style={{ color }}>
              <Icon className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-muted-foreground">{title}</p>

              <p className="mt-0.5 text-xl font-bold leading-none tracking-tight">{value}</p>
            </div>
          </div>

          {/* Change */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px]">
            <span
              className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold"
              style={{
                color,
                backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
              }}
            >
              <TrendIcon className="size-3" />
              {change}%
            </span>

            <span className="truncate text-muted-foreground">{description}</span>
          </div>
        </div>
      </div>

      {/* Outside tooltip */}
      {explanation && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-85 -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <ExplanationPanel explanation={explanation} />
        </div>
      )}
    </div>
  );
}
