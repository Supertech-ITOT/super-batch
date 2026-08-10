"use client";

import { cn } from "@/common/lib/utils";
import { motion } from "framer-motion";

type Props = {
    value?: string | number;
    max: number;
};

export default function CharacterProgress({
    value,
    max,
}: Props) {
    const current =
        typeof value === "number"
            ? Number.isNaN(value)
                ? 0
                : value
            : value?.length ?? 0;

    const isExceeded = current >= max;

    return (
        <span className="flex min-w-0 items-center text-xs text-muted-foreground">
            <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                    duration: 0.1,
                    ease: "easeOut",
                }}
                className={cn(
                    "inline-block min-w-0 max-w-16 truncate",
                    "font-medium",
                    isExceeded
                        ? "text-destructive"
                        : "text-primary"
                )}
                title={String(current)}
            >
                {current}
            </motion.span>

            <span className="shrink-0">/{max}</span>
        </span>
    );
}