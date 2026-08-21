"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { LucideIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import SearchableSelect, { SearchableSelectOption, } from "./searchable-select";
import { Separator } from "../ui/separator";
import { Matcher } from "react-day-picker";
import { Label } from "../ui/label";

interface DateTimePickerProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    disabledDates?: Matcher | Matcher[];
    className?: string;
    icon?: LucideIcon;
    label?: string;
}

function pad(n: number) {
    return n.toString().padStart(2, "0");
}

function toLocalISOString(date: Date) {
    return (
        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())}T` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}:00`
    );
}

function DateTimePicker({ icon: Icon, label, disabledDates, value, onChange, placeholder = "Select date & time", disabled, className, }: DateTimePickerProps) {
    const [open, setOpen] = useState(false);
    const initialDate = value ? new Date(value) : undefined;
    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [hour, setHour] = useState(initialDate ? pad(initialDate.getHours()) : "");
    const [minute, setMinute] = useState(initialDate ? pad(initialDate.getMinutes()) : "");

    // Sync when parent changes value
    useEffect(() => {
        if (!value) {
            setDate(undefined);
            setHour("00");
            setMinute("00");
            return;
        }

        const d = new Date(value);

        setDate(d);
        setHour(pad(d.getHours()));
        setMinute(pad(d.getMinutes()));
    }, [value]);

    // Notify parent
    useEffect(() => {
        if (!date) return;

        const d = new Date(date);
        d.setHours(Number(hour || 0));
        d.setMinutes(Number(minute || 0));
        d.setSeconds(0);
        d.setMilliseconds(0);

        onChange(toLocalISOString(d));
    }, [date, hour, minute, onChange]);

    const createTimeOptions = (length: number): SearchableSelectOption<number>[] =>
        Array.from({ length }, (_, i) => ({
            value: i,
            label: pad(i),
        }));

    const hourOptions = useMemo(() => createTimeOptions(24), []);
    const minuteOptions = useMemo(() => createTimeOptions(60), []);

    const renderTimeSelect = (value: string, onValueChange: (value: string) => void, options: SearchableSelectOption<number>[]) => (
        <div className="flex-1">
            <SearchableSelect
                value={Number(value)}
                emptyValue={0}
                onChange={(v) => {
                    if (v !== undefined) {
                        onValueChange(pad(v));
                    }
                }}
                options={options}
                searchPlaceholder="Search..."
                className="h-10 min-w-24 w-full"
            />
        </div>
    );

    return (
        <div className="space-y-1">
            {label && (
                <Label className="text-sm font-medium">{label} </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-between font-normal bg-card",
                            !date && "text-muted-foreground",
                            className
                        )}
                    >
                        <div className="flex flex-1 items-center gap-2 overflow-hidden">
                            {Icon && (
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            )}

                            <span className="truncate">
                                {date ? `${format(date, "dd MMM yyyy")} ${hour}:${minute}` : placeholder}
                            </span>
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-4"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={disabledDates}
                        className="w-full p-0 m-0"
                    />
                    <Separator />
                    <div className="flex items-center gap-2">
                        {renderTimeSelect(hour, setHour, hourOptions)}
                        <span className="font-semibold text-muted-foreground">:</span>
                        {renderTimeSelect(minute, setMinute, minuteOptions)}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default memo(DateTimePicker);