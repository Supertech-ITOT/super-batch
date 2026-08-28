"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/common/components/ui/dialog";
import RenewLicenseForm from "./renew-license-form";


interface RenewLicenseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function RenewLicenseDialog({ open, onOpenChange, }: RenewLicenseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Renew License</DialogTitle>
                    <DialogDescription>
                        Enter a new license key or upload your license file.
                    </DialogDescription>
                </DialogHeader>
                <RenewLicenseForm onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}