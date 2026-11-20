"use client";

import { useState } from "react";
import { DataTable } from "@/common/components/data-table/data-table";
import { INITIAL_REPORT_FILTER } from "./report-filter-constant";
import { useGetBatches } from "../hooks/use-report";
import FeedbackState from "@/common/components/feedback-state";
import ReportSkeleton from "./report-skeleton";
import { ReportFilterRequest } from "../types/report.types";
import ReportFilter from "./report-filter";
import batchListColumns from "./batch-list-columns";
import { useDebounce } from "@/features/audit/hook/use-debaounce-audit";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 15;
export default function ReportView() {
  const router = useRouter();
  const [filter, setFilter] = useState<ReportFilterRequest>(INITIAL_REPORT_FILTER);
  const debouncedFilter = useDebounce(filter, 500);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const handleFilterChange = (nextFilter: ReportFilterRequest) => {
    setPage(0);
    setFilter(nextFilter);
  };
  const resetFilter = () => {
    setFilter(INITIAL_REPORT_FILTER);
    setPage(0);
  };

  const { data: batches, isLoading, isError } = useGetBatches({ ...debouncedFilter, page: page, size: PAGE_SIZE });

  if (isLoading) {
    return <ReportSkeleton />;
  }
  if (isError) {
    return <FeedbackState variant="error" />;
  }
  if (!batches) {
    return <FeedbackState variant="empty" />;
  }
  return (
    <div className="flex flex-col flex-1 gap-2 overflow-hidden h-full min-h-0 w-full">
      <ReportFilter filter={filter} onFilterChange={handleFilterChange} onReset={resetFilter} />
      <div className="min-h-0 min-w-0">
        <DataTable
          pageSize={PAGE_SIZE}
          columns={batchListColumns}
          compact
          onRowClick={(batch) => setSelectedBatchId(batch.id)}
          isRowSelected={(batch) => batch.id === selectedBatchId}
          data={batches.content}
          serverPagination={{
            pageIndex: batches.number,
            pageCount: batches.totalPages,
            onPageChange: setPage,
          }}
          contextMenu={{
            label: "Action",
            items: [
              {
                label: "View",
                icon: Eye,
                onClick: (row) => router.push(`/Report/Detail/?id=${row.id}`),
              },
            ],
          }}
          rowClassName="h-11"
        />
      </div>
    </div>
  );
}
