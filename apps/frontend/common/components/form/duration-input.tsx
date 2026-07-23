import React, { memo, useCallback, useEffect, useRef, useState, } from "react";
import { cn } from "@/common/lib/utils";

interface DurationInputProps {
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

const pad = (v: string) => v.padStart(2, "0");

function DurationInput({ value = "", onChange, disabled, className }: DurationInputProps) {
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    const editingRef = useRef(false);
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    useEffect(() => {
        if (editingRef.current) return;
        const [h = "", m = ""] = value.split(":");
        setHours(h); setMinutes(m);
    }, [value]);

    const emit = useCallback((h: string, m: string) => {
        onChange(`${pad(h || "0")}:${pad(m || "0")}:00`);
    }, [onChange]);

    const handleChange = useCallback((part: "h" | "m", setter: React.Dispatch<React.SetStateAction<string>>, next?: React.RefObject<HTMLInputElement | null>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            editingRef.current = true;
            let val = e.target.value.replace(/[^\d]/g, "");
            if (val.length > 2) {
                val = val.slice(0, 2);
            }
            if (part !== "h" && val.length === 2 && Number(val) > 59) {
                val = "59";
            }
            setter(val);

            const h = part === "h" ? val : hours;
            const m = part === "m" ? val : minutes;
            emit(h, m);

            if (val.length === 2 && next?.current) {
                requestAnimationFrame(() => {
                    next.current?.focus();
                    next.current?.select();
                });
            }
        },
        [emit, hours, minutes]
    );

    const handleBlur = useCallback(() => {
        editingRef.current = false;
        const h = hours ? pad(hours) : "00";
        const m = minutes ? pad(minutes) : "00";
        setHours(h); setMinutes(m);
        onChange(`${h}:${m}:00`);
    }, [hours, minutes, onChange]);

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, previous?: React.RefObject<HTMLInputElement | null>) => {
        if (e.key === "Backspace" && e.currentTarget.value === "" && previous?.current) {
            previous.current.focus();
        }
    };

    return (
        <div
            className={cn(
                "flex h-9 overflow-hidden rounded-md border bg-card shadow-sm",
                "focus-within:ring-2 focus-within:ring-ring",
                className
            )}
        >
            <input
                ref={hourRef}
                value={hours}
                placeholder="HH"
                disabled={disabled}
                inputMode="numeric"
                maxLength={2}
                onChange={handleChange("h", setHours, minuteRef)}
                onBlur={handleBlur}
                className="w-0 flex-1 bg-transparent text-center outline-none placeholder:text-muted-foreground"
            />

            <div className="w-px bg-border" />

            <input
                ref={minuteRef}
                value={minutes}
                placeholder="MM"
                disabled={disabled}
                inputMode="numeric"
                maxLength={2}
                onChange={handleChange("m", setMinutes)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleBackspace(e, hourRef)}
                className="w-0 flex-1 bg-transparent text-center outline-none placeholder:text-muted-foreground"
            />
        </div>
    );
}

export default memo(DurationInput);