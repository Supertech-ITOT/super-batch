"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, LucideIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/common/lib/utils";
import CharacterProgress from "./character-progress";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    counter?: boolean;
    maxCharacters?: number;
    label?: string;
}

export function PasswordInput({ className, counter, maxCharacters, value, label, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const text = typeof value === "string" ? value : "";
    return (
        <div className="space-y-1">
            {(label || counter) && (
                <div className="flex items-center justify-between">
                    {label ? (<Label htmlFor={props.id} className="text-sm font-medium">{label}</Label>) : (<div />)}
                    {counter && maxCharacters && (<CharacterProgress value={text} max={maxCharacters} />)}
                </div>
            )}

            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    className={cn(
                        "bg-background border-input text-sm font-medium pr-10",
                        "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input",
                        "focus:outline-none",
                        "pl-10",
                        className
                    )}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    className="  absolute right-2 top-1/2 -translate-y-1/2  p-1 rounded-md  text-muted-foreground  hover:text-foreground  focus:outline-none"
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}