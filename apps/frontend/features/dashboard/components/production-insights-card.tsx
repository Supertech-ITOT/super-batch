"use client";

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { InsightCard } from "@/common/components/insight-card";
import { InsightPeriod } from "../type/dashboard.types";
import { useGetProductionInsights } from "../hook/use-dashboard";
import { mapProductionInsights } from "../constants/insights";

export default function ProductionInsightsCard() {
  const [period, setPeriod] = useState<InsightPeriod>("SEVEN_DAYS");
  const { data, isLoading, isError } = useGetProductionInsights(period);
  const productionInsights = data ? mapProductionInsights(data) : [];
  return (
    <section className="flex h-full flex-1 flex-col rounded-2xl border bg-card p-4">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-primary sm:text-lg">Production Insights</h2>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">Key production performance indicators</p>
        </div>

        <Select value={period} onValueChange={(value) => setPeriod(value as InsightPeriod)}>
          <SelectTrigger className="h-8 w-32 shrink-0 text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="SEVEN_DAYS">Last 7 Days</SelectItem>
            <SelectItem value="THIRTY_DAYS">Last 30 Days</SelectItem>
            <SelectItem value="NINETY_DAYS">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
        {isLoading && (
          <div className="col-span-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading production insights...</span>
          </div>
        )}

        {isError && (
          <div className="col-span-full flex items-center justify-center">
            <span className="text-sm text-destructive">Failed to load production insights.</span>
          </div>
        )}

        {!isLoading && !isError && productionInsights.map((insight) => <InsightCard key={insight.title} {...insight} />)}
      </div>
    </section>
  );
}
