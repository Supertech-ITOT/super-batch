import { Skeleton } from "@/common/components/ui/skeleton";

export default function AuditSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border shadow bg-card p-2 sm:p-4 flex-1 gap-2">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-80" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <Skeleton className="min-h-125 rounded-xl" />
            </div>
        </div>
    );
}