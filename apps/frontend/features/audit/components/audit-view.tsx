"use client";

import { useMemo, useState } from "react";
import { useGetBatchAudits } from "../hook/use-batch-audit";
import { useDebounce } from "../hook/use-debaounce-audit";
import columns from "./columns";
import AuditFilter, { AuditFilterValue } from "./audit-filter";
import AuditSkeleton from "./audit-skeleton";
import AuditDetailCard from "./audit-detail-card";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import { INITIAL_AUDIT_FILTER, toBatchAuditSearchRequest } from "./audit-filter.constants";

const PAGE_SIZE = 10;
export default function AuditView() {
  const [page, setPage] = useState(0);
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);
  const [filter, setFilter] = useState<AuditFilterValue>(INITIAL_AUDIT_FILTER);
  const debouncedFilter = useDebounce(filter, 500);
  const searchRequest = useMemo(() => toBatchAuditSearchRequest(debouncedFilter, page, PAGE_SIZE), [debouncedFilter, page]);
  const { data: audits, isLoading, isError } = useGetBatchAudits(searchRequest);

  const selectedAuditExists = audits?.content?.some((audit) => audit.id === selectedAuditId);
  const activeAuditId = selectedAuditExists ? selectedAuditId : (audits?.content?.[0]?.id ?? null);

  const handleFilterChange = (nextFilter: AuditFilterValue) => {
    setPage(0);
    setFilter(nextFilter);
  };
  const resetFilter = () => {
    setFilter(INITIAL_AUDIT_FILTER);
    setPage(0);
  };

  if (isLoading) {
    return <AuditSkeleton />;
  }
  if (isError) {
    return <FeedbackState variant="error" />;
  }
  if (!audits) {
    return <FeedbackState variant="empty" />;
  }

  return (
    <div className="grid min-h-0 w-full grid-cols-1 gap-2 overflow-hidden h-full flex-1 2xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
      <DataTable
        pageSize={PAGE_SIZE}
        columns={columns(page, PAGE_SIZE)}
        onRowClick={(audit) => setSelectedAuditId(audit.id)}
        isRowSelected={(audit) => audit.id === activeAuditId}
        toolbar={() => <AuditFilter filter={filter} onFilterChange={handleFilterChange} onReset={resetFilter} />}
        data={audits.content}
        serverPagination={{
          pageIndex: audits.number,
          pageCount: audits.totalPages,
          onPageChange: setPage,
        }}
        rowClassName="h-12"
      />

      <div className="min-h-0 min-w-0 overflow-hidden">
        <AuditDetailCard id={activeAuditId} />
      </div>
    </div>
  );
}
