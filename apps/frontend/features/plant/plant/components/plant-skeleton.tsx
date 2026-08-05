import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function PlantSkeleton() {
    return (
        <div className="sm:flex-1 flex flex-col rounded-2xl border shadow sm:h-full bg-card p-2 sm:p-4">
            {/* Header */}
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <Skeleton className="size-28 rounded-2xl shrink-0" />
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
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
            {/* Stats */}
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-28 w-72 rounded-2xl shrink-0" />
                ))}
            </div>
            <Separator className="my-2" />
            {/* Table */}
            <div className="flex-1 min-h-0">
                <Skeleton className="h-full w-full rounded-xl min-h-125" />
            </div>
        </div>
    );
}