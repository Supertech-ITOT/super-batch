"use client";

import { useEffect, useState } from "react";
import { Label } from "@/common/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { useTheme } from "next-themes";

export default function AppThemeCard() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // or return a skeleton/placeholder
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-2 flex-col justify-between gap-2">
                <h1 className="font-bold text-sm">Theme</h1>
                <p className="text-muted-foreground text-xs font-semibold">
                    Select application themes.
                </p>
            </div>

            <RadioGroup
                value={theme}
                onValueChange={setTheme}
                className="flex-1 flex flex-wrap justify-between items-center"
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                </div>
            </RadioGroup>
        </div>
    );
}