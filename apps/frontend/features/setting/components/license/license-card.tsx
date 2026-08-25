"use client";

import {
    CalendarDays,
    Clock3,
    KeyRound,
    Monitor,
    ShieldCheck,
    Tag,
    Users,
    UserRound,
    Building2,
} from "lucide-react";
import { format } from "date-fns";

type LicenseData = {
    licenseKey: string;
    planId: string;
    customerName: string;
    companyName: string;
    machineId: string;
    productId: string;
    version: string;
    expiryDate: string;
    maxClients: number;
    activatedAt: string;
    lastValidatedAt: string;
    status: "ACTIVE" | "EXPIRED" | "REVOKED" | "INVALID";
};

type LicenseCardProps = {
    license: LicenseData;
};

export default function LicenseCard({ license }: LicenseCardProps) {
    const isActive = license.status === "ACTIVE";

    const licenseInfo = [
        {
            label: "License Key",
            value: license.licenseKey,
            icon: KeyRound,
            mono: true,
        },
        {
            label: "Plan",
            value: license.planId,
            icon: Tag,
        },
        {
            label: "Customer",
            value: license.customerName,
            icon: UserRound,
        },
        {
            label: "Company",
            value: license.companyName,
            icon: Building2,
        },
        {
            label: "Machine ID",
            value: license.machineId,
            icon: Monitor,
            mono: true,
        },
        {
            label: "Product Version",
            value: license.version,
            icon: ShieldCheck,
        },
        {
            label: "Expiry Date",
            value: format(new Date(license.expiryDate), "dd MMM yyyy"),
            icon: CalendarDays,
        },
        {
            label: "Max Clients",
            value: String(license.maxClients),
            icon: Users,
        },
        {
            label: "Activated",
            value: format(
                new Date(license.activatedAt),
                "dd MMM yyyy, hh:mm a"
            ),
            icon: Clock3,
        },
        {
            label: "Last Validated",
            value: format(
                new Date(license.lastValidatedAt),
                "dd MMM yyyy, hh:mm a"
            ),
            icon: ShieldCheck,
        },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b bg-muted/20 p-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldCheck className="size-5" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold">
                            License
                        </h2>
                        <p className="truncate text-xs text-muted-foreground">
                            Super Batch product license
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${isActive
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                >
                    <span
                        className={`size-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"
                            }`}
                    />
                    {license.status}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                        License Information
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Your Super Batch license and activation details
                    </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    {licenseInfo.map(
                        ({ label, value, icon: Icon, mono }) => (
                            <div
                                key={label}
                                className="flex min-w-0 items-center gap-2.5 rounded-xl border px-3 py-2.5"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-4" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[11px] text-muted-foreground">
                                        {label}
                                    </p>

                                    <p
                                        className={`truncate text-xs font-medium ${mono
                                                ? "font-mono text-[11px]"
                                                : ""
                                            }`}
                                        title={value}
                                    >
                                        {value || "-"}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}