import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function MaterialSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Skeleton className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-48 rounded" />
                        <Skeleton className="h-4 w-48 rounded" />
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="flex-1 min-h-0">
                <Skeleton className="min-h-125 rounded-xl" />
            </div>
        </div>
    );
}