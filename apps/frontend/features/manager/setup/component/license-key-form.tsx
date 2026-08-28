"use client";

import { useState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { TextInput } from "@/common/components/form/text-input";
import { useSetup } from "../hook/use-setup";
import { showApiError } from "@/common/lib/show-api-error";
import { toast } from "sonner";

interface LicenseKeyFormProps {
    onBack: () => void;
}

export default function LicenseKeyForm({ onBack, }: LicenseKeyFormProps) {

    const { mutateAsync, isPending } = useSetup();
    const [key, setKey] = useState("");

    const handleSubmit = async () => {
        try {
            if (!key.trim()) {
                return;
            }
            const formData = new FormData();
            formData.append("activationType", "ONLINE");
            formData.append("licenseKey", key.trim());
            formData.append("isTrial", "false");
            const res = await mutateAsync(formData);
            toast.success(res.message ?? "Setup completed successfully.");
        } catch (error) {
            showApiError(error);
        }

    };

    return (
        <div className="space-y-2">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit p-0!"
                onClick={onBack}
            >
                <ArrowLeft className="mr-2 size-4" />
                Back
            </Button>

            <div className="space-y-1">
                <h2 className="font-semibold">
                    Activate License
                </h2>
                <p className="text-sm text-muted-foreground">
                    Enter your SuperBatch license key to continue.
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
                {isPending ? "Activating..." : "Activate License"}
            </Button>

        </div>
    );
}