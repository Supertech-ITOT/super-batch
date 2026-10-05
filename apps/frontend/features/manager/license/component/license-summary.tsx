"use client";

import { Info } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { LicenseResponse, LicenseStatusConfig } from "../types/license.types";
import { Badge } from "@/common/components/ui/badge";

interface LicenseSummaryProps {
  license: LicenseResponse;
}

export default function LicenseSummary({ license }: LicenseSummaryProps) {
  const expiryDate = license.expiryDate ? new Date(license.expiryDate) : null;
  const daysRemaining = expiryDate ? differenceInCalendarDays(expiryDate, new Date()) : null;

  const items = [
    ["Plan", license.planName],
    ["Status", license.status],
    ["Expiry", expiryDate ? format(expiryDate, "dd MMM yyyy") : "-"],
    ["Units", license.unitCount ?? 0],
    ["Max Units", license.planMaxUnits ?? 0],
    ["Days Left", daysRemaining !== null ? `${Math.max(daysRemaining, 0)} Days` : "-"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">License Summary</h2>
      </div>

      <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-xl border p-3">
            <p className="text-sm text-muted-foreground">{label}</p>

            {label === "Status" ? (
              <div className="mt-1">
                <Badge variant="outline" className={LicenseStatusConfig[license.status as keyof typeof LicenseStatusConfig]?.badgeClass}>
                  {LicenseStatusConfig[license.status as keyof typeof LicenseStatusConfig]?.label ?? license.status}
                </Badge>
              </div>
            ) : (
              <p className="mt-1 text-sm font-semibold">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mx-4 mb-4 flex gap-2 rounded-xl border bg-muted/20 p-3">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-xs leading-4 text-muted-foreground">
          License validation occurs automatically. Ensure the server has internet connectivity and contact your administrator for license related
          queries.
        </p>
      </div>
    </div>
  );
}
