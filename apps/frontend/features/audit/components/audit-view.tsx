"use client";

import { Skeleton } from "@/common/components/ui/skeleton";
import { Separator } from "@/common/components/ui/separator";
import { useGetBatchAudits } from "../hook/use-batch-audit";
import DataTable from "./data-table";
import columns from "./columns";
import { useEffect, useState } from "react";
import {
  BatchAuditResponse,
  BatchAuditSearchRequest,
} from "../types/audit.types";
import AuditChangesDialog from "./audit-changes-dialog";
import { AuditFilterValue } from "./audit-filter";
import { useDebounce } from "../hook/use-debaounce-audit";

export default function AuditView() {
  const [searchRequest, setSearchRequest] = useState<BatchAuditSearchRequest>({
    search: "",
    module: null,
    action: null,
    userId: null,
    fromDate: null,
    toDate: null,
    page: 0,
    size: 8,
  });
  const [filter, setFilter] = useState<AuditFilterValue>({
    search: "",
    module: undefined,
    action: undefined,
    user: undefined,
    fromDate: undefined,
    toDate: undefined,
  });
  const debouncedFilter = useDebounce(filter, 500);
  useEffect(() => {
    setSearchRequest((prev) => ({
      ...prev,
      search: debouncedFilter.search,
      userId: debouncedFilter.user ?? null,
      fromDate: debouncedFilter.fromDate
        ? debouncedFilter.fromDate.toISOString().split("T")[0]
        : null,
      toDate: debouncedFilter.toDate
        ? debouncedFilter.toDate.toISOString().split("T")[0]
        : null,
      page: 0,
    }));
  }, [debouncedFilter]);

  const { data: audits, isLoading } = useGetBatchAudits(searchRequest);
  const [open, setOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<BatchAuditResponse | null>(
    null,
  );

  if (isLoading && !audits) {
    return (
      <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex-1 min-h-0">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
      <div className="flex-1 min-h-0 my-4">
        <DataTable
          columns={columns((audit) => {
            setSelectedAudit(audit);
            setOpen(true);
          })}
          data={audits?.content ?? []}
          filter={filter}
          onFilterChange={setFilter}
        />
        {selectedAudit && (
          <AuditChangesDialog
            open={open}
            onOpenChange={setOpen}
            oldData={selectedAudit.oldData}
            newData={selectedAudit.newData}
          />
        )}
      </div>
    </div>
  );
}
