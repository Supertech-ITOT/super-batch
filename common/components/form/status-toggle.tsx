"use client";

import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import clsx from "clsx";

export type StatusOption<T extends string> = {
    value: T;
    label: string;
    dot?: string;
};

type StatusToggleProps<T extends string> = {
    label?: string;
    value: T;
    options: StatusOption<T>[];
    disabled?: boolean;
    onChange: (value: T) => void;
};

export default function StatusToggle<T extends string>({
    label,
    value,
    options,
    disabled,
    onChange,
}: StatusToggleProps<T>) {
    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}

            <div className="flex overflow-hidden rounded-md border">
                {options.map((option) => {
                    const selected = value === option.value;

                    return (
                        <Button
                            key={option.value}
                            type="button"
                            variant="outline"
                            disabled={disabled}
                            onClick={() => onChange(option.value)}
                            className={clsx(
                                "relative h-8 flex-1 rounded-none border bg-card py-0.5 hover:bg-muted/50",
                                "flex items-center justify-center gap-2",
                                selected && "bg-primary/5"
                            )}
                        >
                            {option.dot && (
                                <div
                                    className={clsx(
                                        "h-3 w-3 rounded-full",
                                        option.dot
                                    )}
                                />
                            )}

                            <span className="text-xs font-medium">
                                {option.label}
                            </span>

                            {selected && (
                                <div className="absolute bottom-0 h-0.5 w-full bg-primary" />
                            )}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}