"use client";

import { ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { TextInput } from "@/common/components/form/text-input";

interface LicenseKeyFormProps {
    onBack: () => void;
}

export default function LicenseKeyForm({ onBack, }: LicenseKeyFormProps) {
    return (
        <div className="space-y-2">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit  p-0!"
                onClick={onBack}
            >
                <ArrowLeft className="mr-2 size-4" />
                Back
            </Button>

            <div className="space-y-1">
                <h2 className="font-semibold">Activate License</h2>
                <p className="text-sm text-muted-foreground">
                    Enter your SuperBatch license key to continue.
                </p>
            </div>

            <TextInput
                icon={KeyRound}
                placeholder="License key"
                type="text"
            />

            <Button type="button" className="w-full text-white">
                Activate License
            </Button>
        </div>
    );
}