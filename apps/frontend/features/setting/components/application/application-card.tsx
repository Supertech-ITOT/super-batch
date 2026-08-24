"use client";

import { CalendarDays, Package, Tag } from "lucide-react";
import { format } from "date-fns";
import { useGetApplicationInfo } from "@/features/application/hook/use-application";


export default function ApplicationCard() {
    const { data, isLoading, isError } = useGetApplicationInfo();

    if (isLoading) {
        return (
            <div className="rounded-2xl border bg-card p-4">
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-muted" />
                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-muted" />
                            <div className="h-3 w-40 rounded bg-muted" />
                        </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-14 rounded-xl bg-muted" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
                Unable to load application information.
            </div>
        );
    }

    const applicationInfo = [
        { label: "Application", value: data.name, icon: Package },
        { label: "Version", value: data.version, icon: Tag },
        {
            label: "Build Time",
            value: data.buildTime
                ? format(new Date(data.buildTime), "dd MMM yyyy, hh:mm a")
                : "-",
            icon: CalendarDays,
        },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex items-center gap-3 border-b bg-muted/20 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Package className="size-5" />
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">
                        Application
                    </h2>
                    <p className="truncate text-xs text-muted-foreground">
                        Application metadata and build information
                    </p>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                        Application Information
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Current application details
                    </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    {applicationInfo.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[11px] text-muted-foreground">
                                    {label}
                                </p>
                                <p className="truncate text-xs font-medium">
                                    {value || "-"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}