"use client";

import React, { useState } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PDFDownloadButtonProps<T> {
  title?: string;
  fileName: string;
  document: (data: T) => React.ReactElement<DocumentProps>;
  onPrepare: () => Promise<T>;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

export function PDFDownloadButton<T>({
  title = "Export",
  fileName,
  document,
  onPrepare,
  variant = "primary",
  className = "",
  disabled = false,
}: PDFDownloadButtonProps<T>) {
  const [loading, setLoading] = useState(false);

  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border border-border bg-background text-foreground hover:bg-card",
  };

  const handleDownload = async () => {
    let apiFailed = false;

    try {
      setLoading(true);
      let data: T;
      try {
        data = await onPrepare();
        if (Array.isArray(data) && data.length === 0) {
          toast.info("No content to download", {
            description: "No data available for this report.",
          });
          return;
        }
      } catch (error) {
        apiFailed = true;
        throw error;
      }
      const blob = await pdf(document(data)).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = fileName;
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("PDF export failed:", error);
      if (!apiFailed) {
        toast.error("Failed to generate PDF", { description: "Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={handleDownload}
      className={`
        inline-flex h-9 min-w-0 flex-1 basis-0 items-center justify-center
        gap-2 rounded-lg border px-3 text-sm font-medium whitespace-nowrap
        transition-all disabled:pointer-events-none disabled:opacity-50
        ${variants[variant]} ${className}
      `}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Download className="h-4 w-4" />
          {title}
        </>
      )}
    </button>
  );
}
