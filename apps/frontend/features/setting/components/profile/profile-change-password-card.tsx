"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import ChangePasswordUserDialog from "@/features/manager/user/components/change-password-user-dialog ";

export default function ProfileChangePasswordCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <KeyRound className="size-4" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Change Password</h3>
                        <p className="text-xs text-muted-foreground">
                            Update your account password
                        </p>
                    </div>
                </div>

                <Button size="sm" onClick={() => setOpen(true)}>
                    Change
                </Button>
            </div>

            <ChangePasswordUserDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}