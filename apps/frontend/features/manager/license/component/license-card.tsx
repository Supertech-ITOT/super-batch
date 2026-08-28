"use client";

import { Building2, CalendarDays, Check, Clock3, Copy, Fingerprint, Info, KeyRound, Package, RefreshCw, ShieldCheck, Tag, UserRound, Users, XCircle, } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { toast } from "sonner";
import { LicenseResponse } from "../types/license.types";
import LicenseActions from "./license-actions";
import LicenseSummary from "./license-summary";


interface LicenseCardProps {
  license: LicenseResponse;
}

export default function LicenseCard({ license }: LicenseCardProps) {
  const isActive = license.status?.toUpperCase() === "ACTIVE";
  const expiryDate = license.expiryDate ? new Date(license.expiryDate) : null;

  const licenseInfo = [
    { label: "License Key", value: license.licenseKey, icon: KeyRound, mono: true, copy: true, },
    { label: "License Number", value: license.licenseNumber, icon: Tag, mono: true, copy: true, },
    { label: "Customer Name", value: license.customerName, icon: UserRound },
    { label: "Company Name", value: license.companyName, icon: Building2 },
    { label: "Machine Fingerprint", value: license.machineFingerprint, icon: Fingerprint, mono: true, copy: true, },
    { label: "Product", value: "SuperBatch", icon: Package },
    { label: "Plan ID", value: license.planId, icon: Tag, mono: true },
    { label: "Plan Name", value: license.planName, icon: Tag },
    { label: "Plan Description", value: license.planDescription, icon: Info },
    { label: "Plan Max User", value: String(license.planMaxUser ?? 0), icon: Users, },
    { label: "User Count", value: String(license.userCount ?? 0), icon: Users },
    { label: "Expiry Date", value: expiryDate ? format(expiryDate, "dd MMM yyyy") : "-", icon: CalendarDays, },
    { label: "Activation Date", value: license.activationDate ? format(new Date(license.activationDate), "dd MMM yyyy") : "-", icon: Clock3, },
    { label: "Last Validated", value: license.lastValidatedAt ? format(new Date(license.lastValidatedAt), "dd MMM yyyy hh:mm a") : "-", icon: ShieldCheck, },
  ];

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard.");
  };

  return (
    <div className="space-y-2">
      <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        {/* License Overview */}
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="border-b p-4">
            <h2 className="text-sm font-semibold">License Overview</h2>
          </div>

          <div className="p-4">
            <div
              className={`mb-3 flex items-center rounded-lg gap-3 border p-3 ${isActive ? "border-primary/20 bg-primary/5" : "border-destructive/20 bg-destructive/5"}`}
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white ${isActive ? "bg-primary" : "bg-destructive"}`}
              >
                {isActive ? (<Check className="size-4" />) : (<XCircle className="size-4" />)}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Status</p>
                <p className={`text-sm font-semibold ${isActive ? "text-primary" : "text-destructive"}`} > {license.status || "UNKNOWN"} </p>
              </div>
            </div>

            <div className="divide-y">
              {licenseInfo.map(({ label, value, icon: Icon, mono, copy }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-center gap-2 px-3 py-2.5 justify-between"
                >
                  <div className="flex gap-2 items-end">
                    <Icon className="size-4 shrink-0" />
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <p
                      className={`truncate text-xs font-medium ${mono ? "font-mono" : ""}`}
                      title={String(value ?? "-")}
                    >
                      {value || "-"}
                    </p>
                    {copy && value && (
                      <button
                        type="button"
                        onClick={() => handleCopy(String(value))}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title={`Copy ${label}`}
                      >
                        <Copy className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="space-y-2">
          <LicenseActions />
          <LicenseSummary license={license} />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex min-h-19 flex-col justify-center rounded-xl border p-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold ${success ? "text-primary" : ""}`}
      >
        {value || "-"}
      </p>
    </div>
  );
}
