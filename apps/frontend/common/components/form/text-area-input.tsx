"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import CharacterProgress from "./character-progress";
import { cn } from "@/common/lib/utils";

interface TextAreaInputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    icon?: LucideIcon;
    counter?: boolean;
    maxCharacters?: number;
    label?: string;
}

export function TextAreaInput({ icon: Icon, className, counter, maxCharacters, value, label, ...props }: TextAreaInputProps) {
    const text = typeof value === "string" ? value : "";
    return (
        <div className="space-y-1">
            {(label || counter) && (
                <div className="flex items-center justify-between">
                    {label ? (
                        <Label htmlFor={props.id} className="text-sm font-medium">
                            {label}
                        </Label>
                    ) : (
                        <div />
                    )}

                    {counter && maxCharacters && (
                        <CharacterProgress value={text} max={maxCharacters} />
                    )}
                </div>
            )}

            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                )}

                <Textarea
                    value={value}
                    className={cn("min-h-28 resize-none", "scrollbar-none", "bg-card border-input", "text-sm font-medium", "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input", "focus:outline-none",
                        Icon && "pl-10",
                        className
                    )}
                    {...props}
                />
            </div>
        </div>
    );
}