"use client";

import { useState } from "react";
import { Eye, TriangleAlert } from "lucide-react";

import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";

import { useGetActiveBatch } from "../hook/use-dashboard";
import { activeBatchColumns } from "./active-batch-columns";
import RecoveryDialog from "@/features/batch/components/recovery-dialog";
import { useRouter } from "next/navigation";

export default function ActiveBatchTable() {
  const { data } = useGetActiveBatch();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [recoveryBatchId, setRecoveryBatchId] = useState<number | null>(null);
  const router = useRouter();

  return (
    <>
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col border bg-card/60 p-4 shadow-sm backdrop-blur-xl rounded-2xl">
        <DataTable
          columns={activeBatchColumns}
          compact
          data={data ?? []}
          rowClassName={(row) =>
            row?.isOverdue
              ? "h-10 bg-linear-to-r from-destructive/10 via-destructive/5 to-transparent border-0 border-l-3! border-destructive hover:from-destructive/12 hover:via-destructive/6 hover:to-transparent"
              : "h-10"
          }
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
                label: "View",
                icon: Eye,
                onClick: (row) => router.push(`/Batch/view/?id=${row.batchId}`),
              },
              {
                label: "Recovery",
                icon: TriangleAlert,
                variant: "destructive",
                show: (row) => row.isOverdue,
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
