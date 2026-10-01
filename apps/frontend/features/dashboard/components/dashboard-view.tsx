"use client";

import { useState } from "react";

import ActiveBatchTable from "./active-batch-table";
import BatchStatusCard from "./batch-status-card";
import ScheduledBatchBar from "./scheduled-batch-bar";
import ViewBatchDialog from "./view-batch-dialog";

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
          {/* Active Batches */}
          <div className="h-100 min-w-0">
            <ActiveBatchTable onBatchClick={handleBatchClick} />
          </div>

          {/* Scheduled Batches */}
          <div className="h-100 min-w-0">
            <ScheduledBatchBar />
          </div>
        </div>
      </div>

      <ViewBatchDialog batchId={selectedBatchId} open={batchDialogOpen} onOpenChange={setBatchDialogOpen} />
    </>
  );
}
