"use client";

import { ArrowLeft, FileKey, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import { showApiError } from "@/common/lib/show-api-error";
import { useActivateOfflineLicense } from "../hooks/use-license";

interface RenewLicenseFileFormProps {
    onBack: () => void;
    onSuccess: () => void;
}

export default function RenewLicenseFileForm({ onBack, onSuccess, }: RenewLicenseFileFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { mutateAsync: activateOfflineLicense, isPending, } = useActivateOfflineLicense();

    const selectFile = (selectedFile: File | undefined) => {
        if (!selectedFile) {
            return;
        }
        if (!selectedFile.name.toLowerCase().endsWith(".lic")) {
            toast.error("Please select a .lic license file.");
            return;
        }
        setFile(selectedFile);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        selectFile(event.dataTransfer.files?.[0]);
    };

    const removeFile = () => {
        setFile(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            return;
        }
        try {
            const res = await activateOfflineLicense(file);
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
                    Renew with License File
                </h2>

                <p className="text-sm text-muted-foreground">
                    Upload the renewed SuperBatch license file.
                </p>
            </div>

            <Card
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={[
                    "border-2 border-dashed transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25",
                ].join(" ")}
            >
                <CardContent className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                    {!file ? (
                        <>
                            <div className="rounded-full bg-primary/10 p-4">
                                <Upload className="size-6 text-primary" />
                            </div>

                            <div>
                                <p className="font-medium">
                                    Drag & drop your license file
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    or select a `.lic` file
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    inputRef.current?.click()
                                }
                            >
                                Select License File
                            </Button>

                            <input
                                ref={inputRef}
                                type="file"
                                accept=".lic"
                                className="hidden"
                                onChange={(event) =>
                                    selectFile(
                                        event.target.files?.[0]
                                    )
                                }
                            />
                        </>
                    ) : (
                        <>
                            <div className="rounded-full bg-primary/10 p-4">
                                <FileKey className="size-6 text-primary" />
                            </div>

                            <div>
                                <p className="font-medium">
                                    {file.name}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    className="text-white"
                                    disabled={isPending}
                                    onClick={handleSubmit}
                                >
                                    {isPending ? "Renewing..." : "Renew License"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={removeFile}
                                    disabled={isPending}
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}