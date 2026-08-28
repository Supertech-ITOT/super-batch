"use client";

import { RefreshCw, ShieldCheck, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { useValidateLicense } from "../hooks/use-license";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useState } from "react";
import RenewLicenseDialog from "./renew-license-dialog";

export default function LicenseActions() {
    const [renewOpen, setRenewOpen] = useState(false);
    const { mutateAsync: validateLicense, isPending: validateLicenseIsPending } = useValidateLicense();
    const actions = [
        {
            label: "Validate Now",
            description: "Check license status with server",
            icon: ShieldCheck,
            iconClassName: "bg-emerald-500/10 text-emerald-600",
            onClick: async () => {
                try {
                    const res = await validateLicense();
                    toast.success(res.message ?? "License validated successfully.")
                }
                catch (error) {
                    showApiError(error);
                }
            },
            loading: validateLicenseIsPending,
        },
        {
            label: "Renew License",
            description: "Renew or extend your license",
            icon: RefreshCw,
            iconClassName: "bg-blue-500/10 text-blue-600",
            onClick: () => setRenewOpen(true),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-2xl border bg-card">
                <div className="border-b p-4">
                    <h2 className="text-sm font-semibold">Actions</h2>
                </div>

                <div className="grid gap-2 p-4 sm:grid-cols-3">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={action.label}
                                variant="outline"
                                className="h-auto justify-start gap-3 p-3"
                                onClick={action.onClick}
                                disabled={action.loading}
                            >
                                <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${action.iconClassName}`}>
                                    <Icon className={`size-5 ${action.loading ? "animate-spin" : ""}`} />
                                </div>

                                <div className="min-w-0 text-left">
                                    <p className="text-sm font-semibold">
                                        {action.loading ? "Validating..." : action.label}
                                    </p>
                                    <p className="mt-0.5 text-[11px] font-normal leading-4 text-muted-foreground">
                                        {action.description}
                                    </p>
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>
            <RenewLicenseDialog
                open={renewOpen}
                onOpenChange={setRenewOpen}
            />
        </>
    );
}