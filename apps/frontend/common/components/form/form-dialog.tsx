"use client";

import { ReactNode, SubmitEventHandler } from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/common/components/ui/dialog";
import { cn } from "@/common/lib/utils";
import FormLoadingButton from "./form-loading-button";

type FormDialogProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
    submitLabel?: string;
    submitDisabled?: boolean;
    icon?: LucideIcon;
    className?: string;
    loading?: boolean;
    onSubmit?: SubmitEventHandler<HTMLFormElement>;
    showFooter?: boolean;
};

export default function FormDialog({ open, onClose, title, description, children, showFooter = true, submitLabel = "Create", icon: Icon, className, loading, submitDisabled, onSubmit, }: FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={(value) => {
            if (!loading && !value) {
                onClose();
            }
        }}>
            <DialogContent
                className={cn(
                    "overflow-hidden rounded-2xl p-0! shadow-xl",
                    className
                )}
                showCloseButton={!loading}
            >
                <div className="relative p-6">
                    {Icon && (
                        <>
                            {/* Primary Glow */}
                            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                            {/* Decorative Watermark */}
                            <Icon
                                className="pointer-events-none absolute right-4 top-4 h-28 w-28 text-primary/10"
                                strokeWidth={1.25}
                            />
                        </>
                    )}

                    {loading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
                            <Loader2 className="h-7 w-7 animate-spin text-primary" />
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <DialogHeader className="relative z-10 space-y-2">
                            <DialogTitle className="text-xl font-semibold tracking-tight">
                                {title}
                            </DialogTitle>
                            {description && (
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        <div className={cn("relative z-10 mt-6", loading && "pointer-events-none opacity-60")}>
                            {children}
                        </div>

                        {showFooter && <DialogFooter className="relative z-10 mt-6">
                            <FormLoadingButton
                                type="submit"
                                loading={loading}
                                disabled={submitDisabled}
                            >
                                {submitLabel}
                            </FormLoadingButton>
                        </DialogFooter>}
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}