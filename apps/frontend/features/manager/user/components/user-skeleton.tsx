import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function UserSkeleton() {
    return (
        <div className="flex-1 rounded-2xl border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-28 rounded-2xl"
                    />
                ))}
            </div>

            <Separator className="my-4" />

            {/* Full Table Skeleton */}
            <div className="flex-1 min-h-0">
                <Skeleton className="h-full w-full rounded-xl" />
            </div>
        </div>
    )
}