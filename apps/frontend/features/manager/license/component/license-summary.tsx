"use client";

import { Info } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { LicenseResponse } from "../types/license.types";

interface LicenseSummaryProps {
    license: LicenseResponse;
}

export default function LicenseSummary({ license }: LicenseSummaryProps) {
    const isActive = license.status?.toUpperCase() === "ACTIVE";
    const expiryDate = license.expiryDate
        ? new Date(license.expiryDate)
        : null;

    const daysRemaining = expiryDate
        ? differenceInCalendarDays(expiryDate, new Date())
        : null;

    const summaryItems = [
        {
            label: "Plan",
            value: license.planName,
        },
        {
            label: "Status",
            value: license.status,
            success: isActive,
        },
        {
            label: "Expiry Date",
            value: expiryDate
                ? format(expiryDate, "dd MMM yyyy")
                : "-",
            success: daysRemaining !== null && daysRemaining >= 0,
        },
        {
            label: "User Count",
            value: String(license.userCount ?? 0),
        },
        {
            label: "Plan Max User",
            value: String(license.planMaxUser ?? 0),
        },
        {
            label: "Days Remaining",
            value:
                daysRemaining !== null
                    ? `${Math.max(daysRemaining, 0)} Days`
                    : "-",
            success: daysRemaining !== null && daysRemaining >= 0,
        },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="border-b p-4">
                <h2 className="text-lg font-semibold">
                    License Summary
                </h2>
            </div>

            <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {summaryItems.map((item) => (
                    <SummaryItem key={item.label} {...item} />
                ))}
            </div>

            <div className="mx-4 mb-4 rounded-xl border bg-muted/20 p-3">
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                        <Info className="size-4 shrink-0 text-primary" />
                        <p className="text-sm font-semibold">Notes</p>
                    </div>

                    <ul className="space-y-1.5 text-xs leading-4 text-muted-foreground">
                        <li>
                            • Your license will be automatically validated at
                            regular intervals.
                        </li>
                        <li>
                            • Ensure your server has internet connectivity for
                            license validation.
                        </li>
                        <li>
                            • Contact your administrator for any license related
                            queries.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function SummaryItem({ label, value, success = false, }: { label: string; value: string; success?: boolean; }) {
    return (
        <div className="flex min-h-19 flex-col justify-center rounded-xl border p-3">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`mt-1 text-sm font-semibold ${success ? "text-primary" : ""}`} >
                {value || "-"}
            </p>
        </div>
    );
}