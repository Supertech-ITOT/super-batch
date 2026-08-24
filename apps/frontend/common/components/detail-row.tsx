import { cn } from "@/common/lib/utils";

interface DetailRowProps {
    label: string;
    value: React.ReactNode;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
}

export default function DetailRow({ label, value, className, labelClassName, valueClassName, }: DetailRowProps) {
    return (
        <div
            className={cn(
                "grid min-w-0 grid-cols-[120px_16px_minmax(0,1fr)] items-center gap-2 text-sm",
                className
            )}
        >
            {/* Label */}
            <div
                className={cn("min-w-0 truncate text-muted-foreground", labelClassName)}
                title={label}
            >
                {label}
            </div>

            {/* Colon */}
            <div className="text-center text-muted-foreground">
                :
            </div>

            {/* Value */}
            <div
                className={cn(
                    "min-w-0 overflow-x-auto whitespace-nowrap font-medium text-foreground scrollbar-none",
                    valueClassName
                )}
            >
                {value}
            </div>
        </div>
    );
}