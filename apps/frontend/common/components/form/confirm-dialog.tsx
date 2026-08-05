"use client";

import { Loader2, LucideIcon, TriangleAlert } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import SuccessOverlay from "./success-overlay";

type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    icon?: LucideIcon;
    className?: string;
    completed?: boolean;
    dialogVariant?: "default" | "destructive";
    successVariant?: "create" | "update" | "delete" | "payment";
};

export default function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmText = "Confirm", cancelText = "Cancel", loading = false, icon: Icon = TriangleAlert, dialogVariant = "default",
    successVariant = "delete", className, completed = false, }: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!loading && !value) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={!loading}
                className={cn(
                    "overflow-hidden rounded-2xl p-0! shadow-xl sm:max-w-md",
                    className
                )}
            >
                <div className="relative p-6">
                    {/* Glow */}
                    <div
                        className={cn(
                            "pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full blur-3xl",
                            dialogVariant === "destructive" ? "bg-destructive/10" : "bg-primary/10"
                        )}
                    />

                    {/* Watermark */}
                    <Icon
                        className={cn(
                            "pointer-events-none absolute left-4 bottom-4 h-28 w-28",
                            dialogVariant === "destructive" ? "text-destructive/10" : "text-primary/10"
                        )}
                        strokeWidth={1.25}
                    />

                    {loading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
                            <Loader2
                                className={cn(
                                    "h-7 w-7 animate-spin",
                                    dialogVariant === "destructive" ? "text-destructive" : "text-primary"
                                )}
                            />
                        </div>
                    )}


                    <DialogHeader className="relative z-10">
                        <DialogTitle className="text-xl font-semibold tracking-tight">{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="relative z-10 mt-6">
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>

                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            variant={dialogVariant === "destructive" ? "destructive" : "default"}
                            className="min-w-32 text-white"
                        >
                            {loading ? (<Loader2 className="h-4 w-4 animate-spin" />) : (confirmText)}
                        </Button>
                    </DialogFooter>
                </div>
                {/* Success Animation Overlay */}
                <SuccessOverlay
                    open={!!completed}
                    variant={successVariant ?? "delete"}
                    onFinish={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}