"use client";

import ActiveBatchTable from "./active-batch-table";
import BatchStatusCard from "./batch-status-card";
import ScheduledBatchBar from "./scheduled-batch-bar";
import ProductionInsightsCard from "./production-insights-card";
import BatchThroughputChart from "./batch-throughput-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useState } from "react";
import { InsightPeriod, PERIODS } from "../type/dashboard.types";
import { Label } from "@/common/components/ui/label";

export default function DashboardView() {
  const [period, setPeriod] = useState<InsightPeriod>("SEVEN_DAYS");
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      <div className="flex justify-end gap-2 items-center bg-background rounded-2xl border p-2">
        <Label className="text-primary text-lg">Period: </Label>
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
      <div className="shrink-0">
        <BatchStatusCard period={period} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[6fr_4fr]">
        <div className="min-h-0 min-w-0">
          <ActiveBatchTable />
        </div>
        <div className="min-h-0 min-w-0">
          <ScheduledBatchBar />
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[4fr_6fr]">
        <div className="min-h-0 min-w-0">
          <ProductionInsightsCard period={period} />
        </div>
        <div className="min-h-0 min-w-0">
          <BatchThroughputChart period={period} />
        </div>
      </div>
    </div>
  );
}
