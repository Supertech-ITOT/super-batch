import { Skeleton } from "@/common/components/ui/skeleton";

export default function ControlRecipeSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48 rounded-lg" />
                    <Skeleton className="h-8 w-48 rounded-lg" />
                </div>
                <div className="min-h-0 flex-1">
                    <Skeleton className="min-h-125 rounded-xl" />
                </div>
            </div>
        </div>
    )
}