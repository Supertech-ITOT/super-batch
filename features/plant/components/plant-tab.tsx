"use client";

import { LayoutGrid, MessageSquareQuoteIcon, Package, Workflow } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/common/lib/utils";

export default function PlantTab() {
    const pathname = usePathname();
    const tabs = [
        {
            label: "Overview",
            path: "/PlantModel/",
            icon: LayoutGrid,
        },
        {
            label: "Materials",
            path: "/PlantModel/materials/",
            icon: Package,
        },
        {
            label: "Process Configuration",
            path: "/PlantModel/process/",
            icon: Workflow,
        },
        {
            label: "Predefined Message",
            path: "/PlantModel/message/",
            icon: MessageSquareQuoteIcon,
        },
    ];

    return (
        <div className="inline-flex items-center rounded-lg border bg-card h-12 overflow-hidden">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = tab.path === pathname;
                return (
                    <Link
                        key={tab.label}
                        href={tab.path}
                        className={cn(
                            "relative flex h-full items-center gap-2 px-4 text-sm font-medium transition-colors overflow-hidden",
                            active
                                ? "bg-primary/5 text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className="size-4" />
                        <span>{tab.label}</span>

                        {active && (
                            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}