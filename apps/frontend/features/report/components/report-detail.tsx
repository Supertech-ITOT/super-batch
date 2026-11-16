"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Hash } from "lucide-react";
import { Badge } from "@/common/components/ui/badge";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { toDisplayText } from "@/common/lib/format-enum";
import { useGetBatchInfo } from "@/features/batch/hook/use-batch";
import { BatchStatusBadgeStyles } from "@/features/batch/types/batch.types";
import BatchOverview from "./overview/batch-overview";
import BatchMaterials from "./material-consumption/batch-materials";
import BatchParameters from "./parameter/batch-parameters";
import BatchQuality from "./quality/batch-quality";

type ReportTab = {
  value: string;
  label: string;
  component: React.ReactNode;
};

type ReportDetailProps = {
  id: number;
};

export default function ReportDetail({ id }: ReportDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: batchInfo, isLoading, isError } = useGetBatchInfo(id);
  const tabOptions = useMemo<ReportTab[]>(
    () => [
      { value: "overview", label: "Overview", component: <BatchOverview id={id} /> },
      { value: "materials", label: "Materials", component: <BatchMaterials id={id} /> },
      { value: "parameters", label: "Parameters", component: <BatchParameters id={id} /> },
      { value: "quality", label: "Quality", component: <BatchQuality id={id} /> },
    ],
    [id],
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col  rounded-2xl border bg-card p-2 shadow sm:p-4">
      {/* Batch Header & Tab Navigation */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Batch Information */}
        <div className="flex min-w-0 items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : isError ? (
            <>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive">Unable to load batch information</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Hash className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-primary sm:text-lg">{batchInfo?.batchNo ?? "-"}</p>
                  {batchInfo?.batchStatus && (
                    <Badge
                      variant="outline"
                      className={`${BatchStatusBadgeStyles[batchInfo.batchStatus as keyof typeof BatchStatusBadgeStyles]} font-bold!`}
                    >
                      {toDisplayText(batchInfo.batchStatus).toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tab Navigation */}
        <TabsList className="grid h-auto w-full grid-cols-4 bg-background! sm:flex sm:w-auto">
          {tabOptions.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className=" px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Tab Content */}
      <div className="flex flex-1">
        {tabOptions.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0 w-full">
            {tab.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
