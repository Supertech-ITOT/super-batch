import { Skeleton } from "@/common/components/ui/skeleton";

export default function ProcessSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-2 2xl:grid-cols-3 flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-full rounded-2xl bg-card"
                />
            ))}
        </div>
    );
}