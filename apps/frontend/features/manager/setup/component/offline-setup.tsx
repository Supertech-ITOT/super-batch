"use client";

import { useRef, useState } from "react";
import { FileKey, Upload, X, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent, } from "@/common/components/ui/card";

export default function OfflineSetup() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const selectFile = (selectedFile: File | undefined) => {
        if (!selectedFile) {
            return;
        }
        if (!selectedFile.name.toLowerCase().endsWith(".lic")) {
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

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <h2 className="font-semibold">Offline Activation</h2>
                <p className="text-sm text-muted-foreground">
                    Upload your SuperBatch license file to activate
                    the application without an internet connection.
                </p>
            </div>

            <Card
                onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={[
                    "border-2 border-dashed transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25",
                ].join(" ")}
            >
                <CardContent className="flex flex-col items-center justify-center gap-3 text-center">{!file
                    ? (
                        <>
                            <div className="rounded-full bg-primary/10 p-4">
                                <Upload className="size-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Drag & drop your license file</p>
                                <p className="text-sm text-muted-foreground">or select a `.lic` file</p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => inputRef.current?.click()}
                            >
                                Select License File
                            </Button>
                            <input
                                ref={inputRef}
                                type="file"
                                accept=".lic"
                                className="hidden"
                                onChange={(event) => selectFile(event.target.files?.[0])}
                            />
                        </>
                    ) : (
                        <>
                            <div className="rounded-full bg-primary/10 p-4">
                                <FileKey className="size-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        // Later:
                                        // upload/validate license
                                    }}
                                >
                                    Activate License
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={removeFile}
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