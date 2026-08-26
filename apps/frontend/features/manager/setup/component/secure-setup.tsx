import { ShieldCheck } from "lucide-react";

export default function SecureSetup() {
    return (
        <div className="mt-4 flex gap-2">
            <ShieldCheck className="size-10 shrink-0 text-primary" />

            <div className="leading-4 space-y-2">
                <p className="font-semibold">
                    Secure Setup
                </p>

                <p className="text-xs leading-4 text-justify text-muted-foreground">
                    All setup information is securely stored. The
                    administrator account will have full access to
                    configure plants, users, and licenses.
                </p>
            </div>
        </div>
    );
}