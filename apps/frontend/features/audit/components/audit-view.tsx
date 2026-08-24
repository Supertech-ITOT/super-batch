"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetBatchAudits } from "../hook/use-batch-audit";
import { useDebounce } from "../hook/use-debaounce-audit";
import columns from "./columns";
import AuditFilter, { AuditFilterValue, } from "./audit-filter";
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
  const searchRequest = useMemo(
    () => toBatchAuditSearchRequest(debouncedFilter, page, PAGE_SIZE),
    [debouncedFilter, page]
  );
  const { data: audits, isLoading, isError, } = useGetBatchAudits(searchRequest);


  useEffect(() => {
    if (!audits?.content?.length) {
      setSelectedAuditId(null);
      return;
    }
    const selectedAuditExists = audits.content.some(
      (audit) => audit.id === selectedAuditId
    );
    if (!selectedAuditExists) {
      setSelectedAuditId(audits.content[0].id);
    }
  }, [audits, selectedAuditId]);

  const handleFilterChange = (nextFilter: AuditFilterValue) => { setPage(0); setFilter(nextFilter); };
  const resetFilter = () => { setFilter(INITIAL_AUDIT_FILTER); setPage(0); };

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
    <div className="grid min-h-0 w-full grid-cols-1 gap-2 overflow-hidden 2xl:h-[calc(100dvh-6rem)] 2xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
      {/* LEFT - TABLE */}
      <DataTable
        pageSize={PAGE_SIZE}
        columns={columns(page, PAGE_SIZE)}
        onRowClick={(audit) => { setSelectedAuditId(audit.id); }}
        isRowSelected={(audit) => audit.id === selectedAuditId}
        toolbar={() => (
          <AuditFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            onReset={resetFilter}
          />
        )}
        data={audits.content}
        serverPagination={{
          pageIndex: audits.number,
          pageCount: audits.totalPages,
          onPageChange: setPage,
        }}
        rowClassName="h-12"

      />


      {/* RIGHT - DETAIL */}
      <div className="min-h-0 min-w-0 overflow-hidden">
        <AuditDetailCard id={selectedAuditId} />
      </div>
    </div>
  )
}