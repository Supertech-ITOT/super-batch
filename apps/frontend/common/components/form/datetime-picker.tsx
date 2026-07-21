"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import SearchableSelect, { SearchableSelectOption } from "./searchable-select";
import { Separator } from "../ui/separator";
import { Matcher } from "react-day-picker";

interface DateTimePickerProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    disabledDates?: Matcher | Matcher[];
    className?: string;
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
        `${pad(date.getMinutes())}:` +
        `${pad(date.getSeconds())}`
    );
}

function DateTimePicker({ disabledDates, value, onChange, placeholder = "Select date & time", disabled, className, }: DateTimePickerProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");

    useEffect(() => {
        if (!date) return;
        const d = new Date(date);
        d.setHours(Number(hour));
        d.setMinutes(Number(minute));
        d.setSeconds(Number(second));
        d.setMilliseconds(0);
        onChange(toLocalISOString(d));
    }, [date, hour, minute, second]);

    const createTimeOptions = (length: number): SearchableSelectOption[] =>
        Array.from({ length }, (_, i) => ({
            value: i,
            label: pad(i),
        }));

    const hourOptions = useMemo(() => createTimeOptions(24), []);
    const minuteOptions = useMemo(() => createTimeOptions(60), []);
    const secondOptions = useMemo(() => createTimeOptions(60), []);

    const renderTimeSelect = (value: string, onChange: (value: string) => void, options: SearchableSelectOption[]) => (
        <div className="flex-1">
            <SearchableSelect
                value={Number(value)}
                onChange={(v) => onChange(pad(v))}
                options={options}
                placeholder="00"
                searchPlaceholder="Search..."
                className="h-10 min-w-24 w-full"
            />
        </div>

    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn("justify-start font-normal w-full", !date && "text-muted-foreground", className)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? `${format(date, "dd MMM yyyy")} ${hour}:${minute}:${second}` : placeholder}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-4">
                <Calendar disabled={disabledDates} mode="single" selected={date} onSelect={setDate} className="w-full p-0 m-0" />
                <Separator />
                <div className="flex gap-2 items-center">
                    {renderTimeSelect(hour, setHour, hourOptions)}
                    <span className="text-muted-foreground font-semibold">:</span>
                    {renderTimeSelect(minute, setMinute, minuteOptions)}
                    <span className="text-muted-foreground font-semibold">:</span>
                    {renderTimeSelect(second, setSecond, secondOptions)}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default memo(DateTimePicker);