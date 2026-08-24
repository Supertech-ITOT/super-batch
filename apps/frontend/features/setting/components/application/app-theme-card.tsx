"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Label } from "@/common/components/ui/label";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/common/components/ui/radio-group";

export default function AppThemeCard() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="rounded-2xl border bg-card p-4">
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-muted" />
                        <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-muted" />
                            <div className="h-3 w-40 rounded bg-muted" />
                        </div>
                    </div>

                    <div className="h-10 rounded-xl bg-muted" />
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex items-center gap-3 border-b bg-muted/20 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Palette className="size-5" />
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">
                        Appearance
                    </h2>
                    <p className="truncate text-xs text-muted-foreground">
                        Customize the application theme
                    </p>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                        Theme
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Select your preferred application theme
                    </p>
                </div>

                <RadioGroup
                    value={theme}
                    onValueChange={setTheme}
                    className="grid gap-2 sm:grid-cols-3"
                >
                    {[
                        { label: "System", value: "system" },
                        { label: "Light", value: "light" },
                        { label: "Dark", value: "dark" },
                    ].map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={`theme-${item.value}`}
                            />
                            <Label
                                htmlFor={`theme-${item.value}`}
                                className="cursor-pointer text-xs font-medium"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}