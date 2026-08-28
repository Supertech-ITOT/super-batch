"use client";

import { ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/common/components/ui/button";
import { TextInput } from "@/common/components/form/text-input";
import { showApiError } from "@/common/lib/show-api-error";

import { useActivateLicense } from "../hooks/use-license";

interface RenewLicenseKeyFormProps {
    onBack: () => void;
    onSuccess: () => void;
}

export default function RenewLicenseKeyForm({ onBack, onSuccess, }: RenewLicenseKeyFormProps) {
    const [key, setKey] = useState("");
    const { mutateAsync: activateLicense, isPending, } = useActivateLicense();
    const handleSubmit = async () => {
        if (!key.trim()) {
            return;
        }
        try {
            const res = await activateLicense(key.trim());
            toast.success(res.message ?? "License renewed successfully.");
            onSuccess();
        } catch (error) {
            showApiError(error);
        }
    };

    return (
        <div className="space-y-4">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit p-0!"
                onClick={onBack}
                disabled={isPending}
            >
                <ArrowLeft className="mr-2 size-4" />
                Back
            </Button>

            <div className="space-y-1">
                <h2 className="font-semibold">
                    Renew with License Key
                </h2>
                <p className="text-sm text-muted-foreground">
                    Enter the license key provided by your administrator.
                </p>
            </div>

            <TextInput
                icon={KeyRound}
                placeholder="License key"
                type="text"
                value={key}
                onChange={(event) => setKey(event.target.value)}
                disabled={isPending}
            />
            <Button
                type="button"
                className="w-full text-white"
                disabled={isPending || !key.trim()}
                onClick={handleSubmit}
            >
                {isPending ? "Renewing..." : "Renew License"}
            </Button>
        </div>
    );
}