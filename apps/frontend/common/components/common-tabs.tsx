"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/common/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { LucideIcon } from "lucide-react";

export interface TabItem {
    label: string;
    path: string;
    icon: LucideIcon;
}

interface CommonTabsProps {
    tabs: TabItem[];
}

export default function CommonTabs({ tabs }: CommonTabsProps) {
    const pathname = usePathname();

    return (
        <Carousel
            opts={{
                align: "start",
                dragFree: true,
            }}
            className="overflow-hidden rounded-2xl border bg-card shadow"
        >
            <CarouselContent className="m-0! h-12!">
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
                                    "relative flex h-12 items-center gap-2 whitespace-nowrap px-4 text-sm font-medium transition-colors",
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
    );
}