"use client";

import { FileKey, KeyRound } from "lucide-react";
import { useState } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";

import RenewLicenseKeyForm from "./renew-license-key-form";
import RenewLicenseFileForm from "./renew-license-file-form";

type RenewalOption = "key" | "file";

const options = [
    {
        value: "key" as const,
        icon: KeyRound,
        title: "Enter License Key",
        description: "Renew SuperBatch using a new license key.",
    },
    {
        value: "file" as const,
        icon: FileKey,
        title: "Upload License File",
        description: "Renew SuperBatch using an offline license file.",
    },
];

interface RenewLicenseFormProps {
    onSuccess: () => void;
}

export default function RenewLicenseForm({
    onSuccess,
}: RenewLicenseFormProps) {
    const [option, setOption] = useState<RenewalOption | null>(null);

    if (option === "key") {
        return (
            <RenewLicenseKeyForm
                onBack={() => setOption(null)}
                onSuccess={onSuccess}
            />
        );
    }

    if (option === "file") {
        return (
            <RenewLicenseFileForm
                onBack={() => setOption(null)}
                onSuccess={onSuccess}
            />
        );
    }

    return (
        <div className="grid gap-2">
            {options.map(({ value, icon: Icon, title, description }) => (
                <Card
                    key={value}
                    className="cursor-pointer transition-colors hover:border-primary"
                    onClick={() => setOption(value)}
                >
                    <CardHeader className="flex flex-row items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <Icon className="size-6 text-primary" />
                        </div>

                        <div className="min-w-0">
                            <CardTitle className="text-sm">
                                {title}
                            </CardTitle>

                            <CardDescription className="text-xs">
                                {description}
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}