"use client";

import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";
import { LucideIcon } from "lucide-react";
import CharacterProgress from "./character-progress";
import { Label } from "../ui/label";
import React from "react";

interface NumberInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "value"
    > {
    icon?: LucideIcon;
    label?: string;
    suffix?: string;
    counter?: boolean;
    maxValue?: number;
    value?: string | number;
}

export function NumberInput({ icon: Icon, className, label, counter, maxValue, value, suffix, ...props }: NumberInputProps) {
    const inputValue =
        typeof value === "number" && Number.isNaN(value)
            ? ""
            : value;
    return (
        <div className="space-y-1">
            {(label || counter) && (
                <div className="flex items-center justify-between">
                    {label
                        ? (<Label htmlFor={props.id} className="text-sm font-medium"> {label}</Label>)
                        : (<div />)
                    }
                    {counter && maxValue && (<CharacterProgress value={inputValue ?? 0} max={maxValue} />)}
                </div>
            )}

            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}

                <Input
                    type="number"
                    className={cn("bg-card border-input", "text-sm font-medium", "focus-visible:ring-0 focus-visible:ring-offset-0", "focus-visible:border-input", "focus:outline-none",
                        Icon && "pl-10",
                        suffix && "pr-10",
                        className
                    )}
                    value={inputValue}
                    {...props}
                />
                {suffix && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}