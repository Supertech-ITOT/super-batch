"use client";

import { XCircle } from "lucide-react";
import { useGetLicense } from "@/features/manager/license/hooks/use-license";
import LicenseCard from "./license-card";
import LicenseSkeleton from "./license-sekeleton";

export default function LicenseView() {
    const { data: license, isLoading, isError } = useGetLicense();

    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col rounded-2xl border bg-card p-2 shadow sm:p-4">
                <LicenseSkeleton />
            </div>
        );
    }

    if (isError || !license) {
        return (
            <div className="flex flex-1 flex-col rounded-2xl border bg-card p-2 shadow sm:p-4">
                <div className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                            <XCircle className="size-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold">
                                Unable to load license
                            </h2>

                            <p className="text-xs text-muted-foreground">
                                License information could not be retrieved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col rounded-2xl border bg-card p-2 shadow sm:p-4">
            <LicenseCard license={license} />
        </div>
    );
}