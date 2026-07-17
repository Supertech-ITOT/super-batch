"use client"
import { Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useSessionTime } from "../hooks/use-session-time";

export default function SessionCard() {
    const { remaining, expiresAt, expired } = useSessionTime();

    return (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Clock className="size-4 text-primary" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">Session</p>
                        <p className="text-xs text-muted-foreground">
                            Active Login
                        </p>
                    </div>
                </div>

                <Badge
                    variant="secondary"
                    className="bg-green-500/15 text-green-600 dark:text-green-400"
                >
                    Active
                </Badge>
            </div>

            <Separator />

            <div className="space-y-2">

                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                        Remaining
                    </span>

                    <span className="font-semibold tabular-nums">
                        {remaining}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                        Expires
                    </span>

                    <span className="font-medium tabular-nums">
                        {expiresAt}
                    </span>
                </div>

            </div>

        </div>
    )
}