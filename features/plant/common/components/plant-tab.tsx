"use client";

import {
    LayoutGrid,
    MessageSquareQuoteIcon,
    Package,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/common/lib/utils";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";

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
        <div className="max-w-fit rounded-lg border bg-card overflow-hidden shadow h-12">
            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="ml-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = pathname === tab.path;

                        return (
                            <CarouselItem
                                key={tab.label}
                                className="basis-auto pl-0"
                            >
                                <Link
                                    href={tab.path}
                                    className={cn(
                                        "relative flex h-12 items-center gap-2 px-4 text-sm font-medium transition-colors whitespace-nowrap",
                                        active
                                            ? "bg-primary/5 text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className="size-4 shrink-0" />

                                    <span>{tab.label}</span>

                                    {active && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                                    )}
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}