import { Skeleton } from "@/common/components/ui/skeleton";

export default function LicenseSkeleton() {
    return (
        <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
            <div className="overflow-hidden rounded-2xl border bg-card">
                <div className="border-b p-4">
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="space-y-3 p-4">
                    <Skeleton className="h-14 w-full rounded-xl" />

                    <div className="space-y-0 rounded-xl border">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex h-14 items-center gap-3 border-b px-3 last:border-0"
                            >
                                <Skeleton className="size-7 shrink-0 rounded-lg" />

                                <div className="space-y-1.5">
                                    <Skeleton className="h-2.5 w-20" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {/* Actions */}
                <div className="overflow-hidden rounded-2xl border bg-card">
                    <div className="border-b p-4">
                        <Skeleton className="h-4 w-20" />
                    </div>

                    <div className="grid gap-2 p-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex h-20 items-center gap-3 rounded-xl border p-3"
                            >
                                <Skeleton className="size-9 shrink-0 rounded-lg" />

                                <div className="space-y-1.5">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-2.5 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="overflow-hidden rounded-2xl border bg-card">
                    <div className="border-b p-4">
                        <Skeleton className="h-4 w-32" />
                    </div>

                    <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex min-h-[76px] flex-col justify-center rounded-xl border p-3"
                            >
                                <Skeleton className="h-2.5 w-20" />
                                <Skeleton className="mt-2 h-3 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Notes */}
                    <div className="mx-4 mb-4 rounded-xl border bg-muted/20 p-3">
                        <div className="flex gap-2.5">
                            <Skeleton className="mt-0.5 size-4 shrink-0 rounded" />

                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-12" />
                                <Skeleton className="h-2.5 w-full max-w-md" />
                                <Skeleton className="h-2.5 w-full max-w-sm" />
                                <Skeleton className="h-2.5 w-3/4 max-w-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}