"use client";
import { Button } from "@/common/components/ui/button";
import { CalendarClock, ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ControlRecipeNav() {
    const router = useRouter();
    const pathname = usePathname();
    const root = pathname === "/Scheduler/"
    return (
        <nav className="border-b p-6 flex gap-4 items-end">
            {!root && <Button onClick={() => router.back()} variant="outline" className=" size-12 hover:scale-110 transition-all duration-200 bg-card! shadow  rounded-full border">
                <ChevronLeft className="w-6! h-6!" />
            </Button>}
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <CalendarClock className="w-6 h-6 shrink-0" />
                    <h1 className="text-xl font-bold">
                        Batch Scheduler
                    </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Create, organize, and control batch recipes for consistent manufacturing execution.                </p>
            </div>
        </nav>
    );
}