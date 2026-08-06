import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function EquipmentSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            {/* Header */}
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <Skeleton className="size-28 rounded-2xl shrink-0" />
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton key={index} className="h-4 w-48 rounded" />
                        ))}
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-100">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                </div>
            </div>
            <Separator className="my-2" />
            {/* Card */}
            <div className="flex-1 space-y-2">
                <h1 className="text-md font-semibold">Equipment Detail</h1>
                <div className="grid gap-2 grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="rounded-2xl border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-background shrink-0" />
                                <div>
                                    <Skeleton className="h-4 w-28 rounded" />
                                    <Skeleton className="h-4 w-48 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}