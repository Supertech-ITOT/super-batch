"use client";

import { CircleDot, Layers, MapPin, SkipForward, Workflow } from "lucide-react";
import { useGetBatchProgress } from "../hook/use-batch";
type Props = {
  id: number;
};
export default function BatchProgressCard({ id }: Props) {
  const { data } = useGetBatchProgress(id);
  const progress = data?.progress ?? 0;

  const stats = [
    {
      label: "Total Steps",
      value: data?.totalStep ?? 0,
      icon: Workflow,
    },
    {
      label: "Completed Steps",
      value: data?.completedStep ?? 0,
      icon: Layers,
    },
    {
      label: "Current Step",
      value: data?.currentStep ?? 0,
      icon: CircleDot,
    },
    {
      label: "Pending Steps",
      value: data?.pendingStep ?? 0,
      icon: MapPin,
    },
    {
      label: "Skipped Steps",
      value: data?.skippedStep ?? 0,
      icon: SkipForward,
    },
  ];

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl">
      <h2 className="mb-3 text-sm font-semibold text-primary sm:text-base">Batch Progress</h2>

      <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-4 sm:grid-cols-2">
        {/* Circular Progress */}
        <div className="flex items-center justify-center">
          <div
            className="relative aspect-square w-full max-w-42 rounded-full"
            style={{
              background: `conic-gradient(#00c853 ${progress}%, var(--muted) ${progress}% 100%)`,
              padding: "11px",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-card text-center">
              <span className="text-3xl font-bold tracking-tight">{progress}%</span>
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
          </div>
        </div>

        {/* Batch Statistics */}
        <div className="flex flex-col justify-center gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
