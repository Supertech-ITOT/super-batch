"use client";

import { useEffect, useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Sheet, SheetContent } from "@/common/components/ui/sheet";

interface ViewBatchDialogProps {
  batchId: number | string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewBatchDialog({ batchId, open, onOpenChange }: ViewBatchDialogProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset fullscreen when closing
  useEffect(() => {
    if (!open) {
      setIsFullscreen(false);
    }
  }, [open]);

  if (!batchId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton
        className={`
          flex h-full flex-col gap-0 p-0
          transition-all duration-300
          ${isFullscreen ? "w-full max-w-none sm:max-w-none" : "w-[95vw] max-w-[1400px] sm:w-[90vw] sm:max-w-[1400px]"}
        `}
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          {/* Left - Close */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span>Close</span>
          </button>

          {/* Right - Fullscreen */}
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background">
          <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Batch</p>

              <h1 className="text-2xl font-semibold">Batch #{batchId}</h1>
            </div>

            {/* Your batch detail UI goes here */}
            <div className="rounded-lg border p-6">Batch detail content</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
