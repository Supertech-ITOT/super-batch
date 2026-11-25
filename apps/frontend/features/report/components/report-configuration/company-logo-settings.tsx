"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteCompanyLogo, useGetCompanyLogo, useUploadCompanyLogo } from "../../hooks/use-report-configuration";
import { toast } from "sonner";

export default function CompanyLogoSettings() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { data: logo, isLoading } = useGetCompanyLogo();
  const upload = useUploadCompanyLogo();
  const remove = useDeleteCompanyLogo();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  const handleUpload = (file?: File) => {
    if (!file) return;
    if (file.type !== "image/png") {
      toast.error("Only PNG images are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Logo size must not exceed 2 MB.");
      return;
    }
    upload.mutate(file, {
      onSuccess: (res) => toast.success(res.message ?? "Logo uploaded successfully."),
      onError: showApiError,
    });
  };

  return (
    <div className="space-y-4 p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold">Company Branding</h2>
        <p className="text-sm text-muted-foreground">Manage the logo displayed on exported reports.</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Company Logo</h3>
            <p className="text-xs text-muted-foreground"> Upload a PNG logo (MAX 2 MB). A transparent background is recommended.</p>
          </div>

          {logo && (
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-full"
                onClick={() => inputRef.current?.click()}
                disabled={upload.isPending}
                title="Replace logo"
              >
                {upload.isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              </Button>

              <Button
                size="icon"
                variant="destructive"
                className="size-8 rounded-full text-white!"
                onClick={() =>
                  remove.mutate(undefined, {
                    onSuccess: (res) => toast.success(res.message ?? "Logo removed successfully."),
                    onError: showApiError,
                  })
                }
                disabled={remove.isPending}
                title="Remove logo"
              >
                {remove.isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              </Button>
            </div>
          )}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleUpload(e.dataTransfer.files[0]);
          }}
          className={`relative flex min-h-40 items-center justify-center overflow-hidden rounded-xl border border-dashed transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          {isLoading ? (
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          ) : logo ? (
            <img src={logo} alt="Company logo" className="h-40 w-full object-contain p-4" />
          ) : (
            <button type="button" onClick={() => inputRef.current?.click()} className="flex flex-col items-center gap-2 p-6 text-center">
              <ImagePlus className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium">Drop logo here or browse</p>
              <p className="text-xs text-muted-foreground">PNG image</p>
            </button>
          )}

          {!logo && !isLoading && (
            <Button
              size="icon"
              variant="outline"
              className="absolute right-2 top-2 size-8 rounded-full"
              onClick={() => inputRef.current?.click()}
              title="Upload logo"
            >
              <Upload className="size-4" />
            </Button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png"
          className="hidden"
          onChange={(e) => {
            handleUpload(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
