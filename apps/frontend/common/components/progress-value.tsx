import { cn } from "../lib/utils";

interface ProgressValueProps {
  value: number;
}

export function ProgressValue({ value }: ProgressValueProps) {
  const progress = Math.max(0, value);

  const color = progress > 100 ? "bg-destructive" : progress >= 90 ? "bg-emerald-500" : progress >= 70 ? "bg-yellow-500" : "bg-primary";

  return (
    <div className="mx-auto flex w-full max-w-66 items-center gap-0.5">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted border">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      <span className={cn("w-8 shrink-0 text-right text-xs font-semibold", progress > 100 ? "text-destructive" : progress >= 90 ? "text-emerald-600 dark:text-emerald-400" : progress >= 70 ? "text-yellow-600 dark:text-yellow-400" : "text-primary")}>
        {progress}%
      </span>
    </div>
  );
}
