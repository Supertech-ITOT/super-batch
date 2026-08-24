"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Label } from "@/common/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";

export interface DateRangeValue {
    fromDate?: Date;
    toDate?: Date;
}

interface DateRangeInputProps {
    value: DateRangeValue;
    onChange: (value: DateRangeValue) => void;
    label?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function DateRangeInput({ value, onChange, label, className, placeholder = "Select Date Range", disabled = false, }: DateRangeInputProps) {
    const [open, setOpen] = useState(false);
    const selectedRange: DateRange | undefined =
        value.fromDate
            ? {
                from: value.fromDate,
                to: value.toDate,
            }
            : undefined;

    const handleSelect = (dateRange: DateRange | undefined) => {
        onChange({
            fromDate: dateRange?.from,
            toDate: dateRange?.to,
        });
    };

    const displayValue =
        value.fromDate && value.toDate
            ? `${format(value.fromDate, "dd MMM yyyy")} - ${format(
                value.toDate,
                "dd MMM yyyy",
            )}`
            : value.fromDate
                ? `${format(value.fromDate, "dd MMM yyyy")} - To Date`
                : placeholder;

    return (
        <div className={cn("space-y-1", className)}>
            {label && (
                <Label className="text-sm font-medium">
                    {label}
                </Label>
            )}

            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-start", "overflow-hidden",
                            "bg-card hover:bg-card",
                            "focus:bg-card focus-visible:bg-card",
                            "active:bg-card",
                            "data-[state=open]:bg-card",
                            "font-medium",
                            !value.fromDate && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {displayValue}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                >
                    <Calendar
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleSelect}
                        disabled={(date) => date > new Date()}
                        defaultMonth={value.fromDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}