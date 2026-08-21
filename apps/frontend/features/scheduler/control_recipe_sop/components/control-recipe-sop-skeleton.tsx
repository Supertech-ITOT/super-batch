import { Skeleton } from "@/common/components/ui/skeleton";

export function ControlRecipeSOPSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-2 rounded-2xl border bg-card p-2 shadow sm:gap-4 sm:p-4">
            {/* Recipe Info */}
            <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <div className="flex gap-3">
                    {[32, 28, 36, 24].map(w => (
                        <Skeleton key={w} className={`h-5 w-${w}`} />
                    ))}
                </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:gap-4 2xl:h-[calc(100dvh-15rem)] 2xl:flex-row">
                {/* Table + Summary */}
                <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-4">
                    <div className="min-h-0 flex-4 rounded-2xl border bg-card p-4 shadow">
                        <div className="mb-4 flex justify-between">
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-9 w-24" />
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                    </div>

                    <div className="flex-2 rounded-2xl border bg-card p-4 shadow">
                        <Skeleton className="mb-4 h-6 w-32" />
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dialog */}
                <div className="min-h-100 flex-1 rounded-2xl border p-4 shadow 2xl:shrink-0">
                    <div className="mb-5 space-y-2">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                        <Skeleton className="h-20 w-full" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 flex-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}