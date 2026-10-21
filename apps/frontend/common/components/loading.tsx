"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

const messages = [
  "Initializing production data",
  "Retrieving batch check details",
  "Synchronizing process parameters",
  "Validating batch information",
  "Fetching material records",
  "Loading quality check results",
  "Verifying process measurements",
  "Synchronizing equipment status",
  "Retrieving batch history",
  "Validating material consumption",
  "Preparing production records",
  "Processing quality parameters",
  "Checking data consistency",
  "Updating batch information",
  "Finalizing data retrieval",
];

const MESSAGE_INTERVAL = 2000;

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, MESSAGE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="relative flex size-12 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-primary/15" />

        <LoaderCircle className="size-9 animate-spin text-primary" strokeWidth={1.8} aria-hidden="true" />
      </div>

      <div className="relative flex h-6 w-full max-w-md items-center justify-center overflow-hidden" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={messages[index]}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute max-w-full truncate px-2 text-sm font-medium text-foreground"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
        Please hold on while the system retrieves and validates production data.
      </p>
    </div>
  );
}
