"use client";

import ActiveBatchTable from "./active-batch-table";
import BatchStatusCard from "./batch-status-card";
import ScheduledBatchBar from "./scheduled-batch-bar";
import ProductionInsightsCard from "./production-insights-card";
import BatchThroughputChart from "./batch-throughput-chart";

export default function DashboardView() {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      <div className="shrink-0">
        <BatchStatusCard />
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
          <ProductionInsightsCard />
        </div>
        <div className="min-h-0 min-w-0">
          <BatchThroughputChart />
        </div>
      </div>
    </div>
  );
}
