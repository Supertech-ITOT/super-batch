import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function SidebarSkeleton({ open }: { open: boolean }) {
    return (
        <>
            {/* Logo */}
            <div className="my-4">
                <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Plant Operation */}
            {open && (
                <Skeleton className="mt-10 h-4 w-32" />
            )}

            <div className="mt-3 space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-2 py-2"
                    >
                        <Skeleton className="h-5 w-5 rounded-md" />
                        {open && <Skeleton className="h-4 flex-1" />}
                    </div>
                ))}
            </div>

            {/* Configuration */}
            {open && (
                <Skeleton className="mt-10 h-4 w-28" />
            )}

            <div className="mt-3 space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-2 py-2"
                    >
                        <Skeleton className="h-5 w-5 rounded-md" />
                        {open && <Skeleton className="h-4 flex-1" />}
                    </div>
                ))}
            </div>

            {/* User */}
            <div className="mt-auto py-4">
                <Separator className="mb-4" />
                <div className="flex items-center gap-3 px-2">
                    <Skeleton className="h-11 w-11 rounded-full" />
                    {open && (
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}