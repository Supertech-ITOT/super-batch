"use client";

import { useState } from "react";
import { KeyRound, Rocket } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, } from "@/common/components/ui/card";
import LicenseKeyForm from "./license-key-form";
import TrialSetupForm from "./trial-setup-form";

type OnlineOption = "trial" | "license";

const options = [
    {
        value: "trial" as const,
        icon: Rocket,
        title: "Start Free Trial",
        description: "Create your organization with a trial license.",
    },
    {
        value: "license" as const,
        icon: KeyRound,
        title: "Enter License Key",
        description: "Activate SuperBatch using an existing license.",
    },
];

export default function OnlineSetup() {
    const [option, setOption] = useState<OnlineOption | null>(null);

    if (option === "trial") {
        return <TrialSetupForm onBack={() => setOption(null)} />;
    }

    if (option === "license") {
        return <LicenseKeyForm onBack={() => setOption(null)} />;
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