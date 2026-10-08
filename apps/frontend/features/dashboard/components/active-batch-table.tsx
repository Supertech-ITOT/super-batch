"use client";

import { useState } from "react";
import { Eye, TriangleAlert } from "lucide-react";

import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";

import { useGetActiveBatch } from "../hook/use-dashboard";
import { activeBatchColumns } from "./active-batch-columns";
import RecoveryDialog from "@/features/batch/component/recovery-dialog";

export default function ActiveBatchTable() {
  const { data } = useGetActiveBatch();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [recoveryBatchId, setRecoveryBatchId] = useState<number | null>(null);

  return (
    <>
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col border bg-card/60 p-4 shadow-sm backdrop-blur-xl rounded-2xl">
        <DataTable
          columns={activeBatchColumns}
          compact
          data={data ?? []}
          rowClassName="h-10"
          pageSize={5}
          tableClassName="min-h-0"
          toolbar={(table) => (
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-primary sm:text-base min-w-28">Active Batches</h2>
              <DataTableSearch table={table} column="batchNo" placeholder="Search batch no" compact />
            </div>
          )}
          emptyMessage="No active batches."
          onRowClick={(row) => {
            setSelectedRowId(row.batchId);
          }}
          isRowSelected={(row) => row.batchId === selectedRowId}
          contextMenu={{
            label: "Action",
            items: [
              {
                label: "Recovery",
                icon: TriangleAlert,
                variant: "destructive",
                show: (row) => row.progress > 100,
                onClick: (row) => setRecoveryBatchId(row.batchId),
              },
            ],
          }}
        />
      </div>

      {recoveryBatchId !== null && <RecoveryDialog open batchId={recoveryBatchId} onClose={() => setRecoveryBatchId(null)} />}
    </>
  );
}
