"use client";

import { format } from "date-fns";
import { Calendar, Copyright, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function FooterCard() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="fixed bottom-0 z-50  hidden 2xl:flex h-12 w-full items-center justify-between border-t bg-card/70 px-15 backdrop-blur-md">

            {/* Status */}
            <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />

                <p className="text-sm font-semibold tracking-wide text-foreground">
                    System Status:
                    <span className="ml-1 text-primary">
                        Operational
                    </span>
                </p>
            </div>

            {/* Date Time */}
            <div className="flex items-center gap-3 font-semibold">
                <Calendar className="h-5 w-5 text-muted-foreground" />

                <span>
                    {currentTime
                        ? format(currentTime, "MMM dd, yyyy | hh:mm:ss a")
                        : "--:--:--"}
                </span>
            </div>

            {/* Version */}
            <div className="flex items-center gap-3 font-semibold">
                <User className="h-5 w-5 text-muted-foreground" />

                <span>v1.0.0.0</span>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm font-semibold">
                <Copyright className="h-5 w-5 text-muted-foreground" />

                <span>2025 SuperBatch. All rights reserved.</span>
            </div>
        </footer>
    );
}