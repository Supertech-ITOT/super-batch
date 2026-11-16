"use client";

import { InsightCard } from "@/common/components/insight-card";
import { InsightPeriod, PERIODS } from "../type/dashboard.types";
import { useGetProductionInsights } from "../hook/use-dashboard";
import { mapProductionInsights } from "../constants/insights";

type prop = {
  period: InsightPeriod;
};
export default function ProductionInsightsCard({ period }: prop) {
  const { data, isLoading, isError } = useGetProductionInsights(period);
  const productionInsights = data ? mapProductionInsights(data) : [];
  return (
    <section className="flex h-full flex-col rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl">
      <h2 className="text-sm font-semibold text-primary sm:text-base mb-2">Production Insights</h2>

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
