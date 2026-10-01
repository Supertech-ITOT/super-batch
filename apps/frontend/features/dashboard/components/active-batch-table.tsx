"use client";

import { useState } from "react";
import { Eye, TriangleAlert } from "lucide-react";

import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";

import { useGetActiveBatch } from "../hook/use-dashboard";
import { activeBatchColumns } from "./active-batch-columns";
import RecoveryDialog from "@/features/batch/component/recovery-dialog";

interface ActiveBatchTableProps {
  onBatchClick: (batchId: number) => void;
}

export default function ActiveBatchTable({ onBatchClick }: ActiveBatchTableProps) {
  const { data } = useGetActiveBatch();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [recoveryBatchId, setRecoveryBatchId] = useState<number | null>(null);

  return (
    <>
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-card p-2 shadow-sm sm:p-4">
        <DataTable
          columns={activeBatchColumns}
          compact
          data={data ?? []}
          rowClassName="h-10"
          pageSize={5}
          tableClassName="min-h-0"
          toolbar={(table) => (
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-primary sm:text-lg">Active Batches</h2>

              <DataTableSearch table={table} column="batchNo" placeholder="Search batch no, product or unit..." compact />
            </div>
          )}
          emptyMessage="No active batches."
          onRowClick={(row) => {
            setSelectedRowId(row.batchId);
            onBatchClick(row.batchId);
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
