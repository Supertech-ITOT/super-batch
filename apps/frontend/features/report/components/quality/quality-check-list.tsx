"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { CalendarClock, Hash } from "lucide-react";
import { Badge } from "@/common/components/ui/badge";
import { DataTable } from "@/common/components/data-table/data-table";
import { QualityCheckSampleList } from "../../types/report.types";
import qualityCheckListColumns from "./quality-check-list-columns";
import { format } from "date-fns";

type prop = {
  data: QualityCheckSampleList[];
};

export default function QualityCheckList({ data }: prop) {
  if (!data.length) {
    return <div className="border rounded-xl w-full p-8 text-center text-sm text-muted-foreground">No quality check samples available.</div>;
  }

  return (
    <Accordion type="multiple" className="w-full space-y-3">
      {data.map((sample) => (
        <AccordionItem key={sample.id} value={String(sample.id)} className="border rounded-xl px-0! bg-background/20!">
          <AccordionTrigger className="relative overflow-hidden hover:no-underline py-2.5 px-3">
            <div
              className={`absolute -bottom-10 -right-8 size-28 rounded-full blur-3xl opacity-20 pointer-events-none ${
                sample.failedParameters > 0 ? "bg-destructive" : "bg-primary"
              }`}
            />

            <div className="relative z-10 w-full flex flex-col gap-2 pr-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 space-y-1">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Hash className="size-3.5" />
                    {sample.sampleNo}
                  </p>

                  <p className="flex items-center gap-1.5 text-xs">
                    <CalendarClock className="size-3.5" />
                    {format(new Date(sample.sampleDateTime), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>

                <Badge variant="outline" className={`shrink-0 text-white border-0 ${sample.failedParameters > 0 ? "bg-destructive" : "bg-primary"}`}>
                  {sample.failedParameters > 0 ? "Failed" : "Passed"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 border-t pt-2">
                {[
                  { label: "Parameters", value: sample.totalParameters },
                  { label: "Passed", value: sample.passedParameters, color: "text-primary" },
                  { label: "Failed", value: sample.failedParameters, color: "text-destructive" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-center gap-1.5 border-l first:border-l-0">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <strong className={`text-sm ${item.color ?? ""}`}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="sm:px-3 px-1.5 relative overflow-hidden">
            <div
              className={`absolute -bottom-10 -left-8 size-28 rounded-full blur-3xl opacity-20 pointer-events-none ${
                sample.failedParameters > 0 ? "bg-destructive" : "bg-primary"
              }`}
            />
            <DataTable
              columns={qualityCheckListColumns}
              data={sample.results}
              pageSize={10}
              emptyMessage="No parameter results available."
              compact
              showEmptyRows={false}
              rowClassName="h-12"
              tableClassName="min-h-fit"
              fitContent
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
