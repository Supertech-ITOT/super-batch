"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";

type FormLoadingButtonProps = {
    loading?: boolean;
    children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export default function FormLoadingButton({ loading = false, children, className, disabled, ...props }: FormLoadingButtonProps) {
    return (
        <Button
            disabled={loading || disabled}
            className={cn(
                "relative w-full overflow-hidden rounded-lg font-medium text-white transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/20",
                "active:scale-[0.98]",
                className
            )}
            {...props}
        >
            <span
                className={cn(
                    "flex items-center justify-center gap-2 transition-all duration-200",
                    loading && "opacity-90"
                )}
            >
                {loading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {loading ? "Please wait..." : children}
            </span>
        </Button>
    );
}