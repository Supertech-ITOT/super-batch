"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import SearchableSelect, { SearchableSelectOption, } from "./searchable-select";
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
        `${pad(date.getMinutes())}:00`
    );
}

function DateTimePicker({ disabledDates, value, onChange, placeholder = "Select date & time", disabled, className, }: DateTimePickerProps) {
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

    const createTimeOptions = (length: number): SearchableSelectOption[] =>
        Array.from({ length }, (_, i) => ({
            value: i,
            label: pad(i),
        }));

    const hourOptions = useMemo(() => createTimeOptions(24), []);
    const minuteOptions = useMemo(() => createTimeOptions(60), []);

    const renderTimeSelect = (value: string, onValueChange: (value: string) => void, options: SearchableSelectOption[]) => (
        <div className="flex-1">
            <SearchableSelect
                value={Number(value)}
                onChange={(v) => onValueChange(pad(v))}
                options={options}
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
                    className={cn(
                        "justify-start w-full font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? `${format(date, "dd MMM yyyy")} ${hour}:${minute}` : placeholder}
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
    );
}

export default memo(DateTimePicker);