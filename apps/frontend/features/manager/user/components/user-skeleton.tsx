import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function UserSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-28 rounded-2xl"
                    />
                ))}
            </div>

            <Separator className="my-2" />

            {/* Full Table Skeleton */}
            <div className="flex-1 min-h-0">
                <Skeleton className="min-h-125 rounded-xl" />
            </div>
        </div>
    )
}