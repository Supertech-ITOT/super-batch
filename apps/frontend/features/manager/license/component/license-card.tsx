"use client";

import { getLicenseInfo, LicenseResponse, LicenseStatusConfig } from "../types/license.types";
import LicenseActions from "./license-actions";
import LicenseSummary from "./license-summary";

interface LicenseCardProps {
  license: LicenseResponse;
}

export default function LicenseCard({ license }: LicenseCardProps) {
  const licenseInfo = getLicenseInfo(license);
  const statusConfig = LicenseStatusConfig[license.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full min-w-0 space-y-2">
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* License Overview */}
        <div className="min-w-0 overflow-hidden rounded-2xl border bg-card">
          <div className="border-b p-4">
            <h2 className="text-sm font-semibold">License Overview</h2>
          </div>

          <div className="min-w-0 p-4">
            {/* Status */}
            <div className={`mb-3 flex min-w-0 items-center gap-3 rounded-lg border p-3 ${statusConfig.bgClass}`}>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full">
                <StatusIcon className={`size-5 ${statusConfig.iconClass}`} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Status</p>
                <p className={`text-sm font-semibold ${statusConfig.iconClass}`}>{statusConfig.label}</p>
              </div>
            </div>

            {/* License Details */}
            <div className="divide-y">
              {licenseInfo.map(({ label, value, icon: Icon, mono }) => (
                <div key={label} className="grid min-w-0 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-3 px-3 py-3">
                  {/* Label */}
                  <div className="flex min-w-0 items-start gap-2">
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <p className="min-w-0 wrap-break-word text-sm text-muted-foreground">{label}</p>
                  </div>

                  {/* Value */}
                  <div className="min-w-0">
                    <p
                      className={`min-w-0 whitespace-normal wrap-break-word text-right text-xs font-medium ${mono ? "font-mono wrap-anywhere" : ""}`}
                      title={String(value ?? "-")}
                    >
                      {value || "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="min-w-0 space-y-3">
          <LicenseActions />
          <LicenseSummary license={license} />
        </div>
      </div>
    </div>
  );
}
