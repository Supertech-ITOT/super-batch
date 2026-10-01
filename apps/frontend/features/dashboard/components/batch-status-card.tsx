"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/common/components/ui/carousel";
import { BatchStatusConfig, BatchStatusCardResponse } from "../type/dashboard.types";
import { useGetBatchStatus } from "../hook/use-dashboard";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Database } from "lucide-react";

function StatusCard({ data }: { data: BatchStatusCardResponse }) {
  const config = BatchStatusConfig[data.status];
  const Icon = config.icon;
  return (
    <div className="h-full rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.bgClass}`}>
          <Icon className={`h-6 w-6 ${config.iconClass}`} strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">{config.label}</p>
          <p className="mt-1 text-2xl font-semibold">{data.count}</p>
        </div>
      </div>
    </div>
  );
}

export default function BatchStatusCard() {
  const { data, isLoading, isError } = useGetBatchStatus();

  if (isLoading) {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6">
              <Skeleton className="h-31.5 rounded-xl border bg-card p-4 shadow-sm" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-31.5 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 text-sm text-destructive">
        Failed to load batch status.
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6 ">
          <div className="h-full rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Database className="h-6 w-6 text-primary" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-muted-foreground">Total Batches</p>
                <p className="mt-1 text-2xl font-semibold">{data.totalBatches}</p>
              </div>
            </div>
          </div>
        </CarouselItem>

        {data.statuses.map((status) => (
          <CarouselItem key={status.status} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6 pl-2!">
            <StatusCard data={status} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
