"use client";

import { Boxes, CalendarClock, FileText, Hash, Package, Scale } from "lucide-react";

import { useGetScheduledBatch } from "../hook/use-dashboard";
import { ScheduledBatchResponse } from "../type/dashboard.types";
import { format } from "date-fns";

function ScheduledBatchItem({ batch, index }: { batch: ScheduledBatchResponse; index: number }) {
  return (
    <div className="relative flex min-w-155 gap-2.5">
      {/* Timeline */}
      <div className="relative flex w-4 shrink-0 justify-center">
        {index > 0 && <div className="absolute bottom-1/2 top-0 w-px bg-border" />}

        {index > 0 && <div className="absolute bottom-0 top-1/2 w-px bg-border" />}

        <div className="relative z-10 mt-4 size-2 rounded-full bg-primary ring-4 ring-card" />
      </div>

      {/* Batch Card */}
      <div className="mb-1.5 flex min-w-0 flex-1 items-center gap-3 rounded-lg border bg-card px-3 py-2.5 shadow-sm">
        {/* Batch Icon */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <FileText className="size-4 text-foreground/70" />
        </div>

        {/* Details */}
        <div className="grid min-w-0 flex-1 grid-cols-5 items-center gap-4">
          {/* Batch No */}
          <div className="flex min-w-0 items-center gap-1.5">
            <Hash className="size-3.5 shrink-0 text-primary/70" />

            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Batch</p>

              <p className="truncate text-xs font-semibold text-foreground">{batch.batchNo}</p>
            </div>
          </div>

          {/* Product */}
          <div className="flex min-w-0 items-center gap-1.5">
            <Package className="size-3.5 shrink-0 text-primary/70" />

            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Product</p>

              <p className="truncate text-xs font-medium text-foreground">{batch.product}</p>
            </div>
          </div>

          {/* Batch Size */}
          <div className="flex min-w-0 items-center gap-1.5">
            <Scale className="size-3.5 shrink-0 text-primary/70" />

            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Size</p>

              <p className="whitespace-nowrap text-xs font-semibold text-foreground">
                {batch.batchSize}
                <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">KG</span>
              </p>
            </div>
          </div>

          {/* Scheduled */}
          <div className="flex min-w-0 items-center gap-1.5">
            <CalendarClock className="size-3.5 shrink-0 text-primary/70" />

            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Scheduled</p>

              <p className="truncate text-xs font-medium text-foreground">{format(batch.scheduledAt, "hh:mm a")}</p>
            </div>
          </div>

          {/* Unit */}
          <div className="flex min-w-0 items-center gap-1.5">
            <Boxes className="size-3.5 shrink-0 text-primary/70" />

            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Unit</p>

              <p className="truncate text-xs font-medium text-foreground">{batch.unit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-14 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}

function ErrorState() {
  return <div className="flex flex-1 items-center justify-center text-sm text-destructive">Failed to load upcoming batches.</div>;
}

function EmptyState() {
  return <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">No upcoming batches.</div>;
}

export default function ScheduledBatchBar() {
  const { data, isLoading, isError } = useGetScheduledBatch();

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-card p-3 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <h2 className="text-sm font-semibold text-primary sm:text-base">Upcoming Batches</h2>

        {data?.length ? <span className="text-[10px] text-muted-foreground">{data.length} scheduled</span> : null}
      </div>

      {/* Loading */}
      {isLoading && <LoadingState />}

      {/* Error */}
      {isError && <ErrorState />}

      {/* Empty */}
      {!isLoading && !isError && !data?.length && <EmptyState />}

      {/* Data */}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="h-full min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto">
          <div className="w-full min-w-155 space-y-0.5 pr-1">
            {data.map((batch, index) => (
              <ScheduledBatchItem key={batch.batchNo} batch={batch} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
