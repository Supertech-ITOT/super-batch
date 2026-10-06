"use client";

import { useState } from "react";

import ActiveBatchTable from "./active-batch-table";
import BatchStatusCard from "./batch-status-card";
import ScheduledBatchBar from "./scheduled-batch-bar";
import ViewBatchDialog from "./view-batch-dialog";
import ProductionInsightsCard from "./production-insights-card";

export default function DashboardView() {
  const [selectedBatchId, setSelectedBatchId] = useState<number | string | null>(null);

  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  const handleBatchClick = (batchId: number | string) => {
    setSelectedBatchId(batchId);
    setBatchDialogOpen(true);
  };

  return (
    <>
      <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2">
        <BatchStatusCard />

        <div className="grid min-w-0 grid-cols-1 gap-2 lg:grid-cols-[6fr_4fr]">
          <div className="min-w-0 min-h-100">
            <ActiveBatchTable onBatchClick={handleBatchClick} />
          </div>
          <div className="min-w-0 min-h-100">
            <ScheduledBatchBar />
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 lg:grid-cols-[4fr_6fr]">
          <div className="min-w-0 min-h-84">
            <ProductionInsightsCard />
          </div>
          <div className="min-w-0 min-h-84"></div>
        </div>
      </div>
      <ViewBatchDialog batchId={selectedBatchId} open={batchDialogOpen} onOpenChange={setBatchDialogOpen} />
    </>
  );
}
