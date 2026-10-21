"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { format, startOfDay } from "date-fns";
import type { LucideIcon } from "lucide-react";
import type { Matcher } from "react-day-picker";

import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Label } from "@/common/components/ui/label";
import { Separator } from "@/common/components/ui/separator";
import { cn } from "@/common/lib/utils";

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

const MINUTE_STEP = 5;

const pad = (value: number) => String(value).padStart(2, "0");

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function toLocalISOString(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` + `T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

function roundUpToNextFiveMinutes(date: Date): Date {
  const rounded = new Date(date);
  rounded.setSeconds(0, 0);
  rounded.setMinutes(Math.ceil(rounded.getMinutes() / MINUTE_STEP) * MINUTE_STEP);
  return rounded;
}

function getInitialDate(value?: string): Date {
  const parsed = parseDate(value);
  return parsed ?? roundUpToNextFiveMinutes(new Date());
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function DateTimePicker({
  icon: Icon,
  label,
  disabledDates,
  value,
  onChange,
  placeholder = "Select date & time",
  disabled,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date>(() => getInitialDate(value));
  const [hour, setHour] = useState(() => getInitialDate(value).getHours());
  const [minute, setMinute] = useState(() => getInitialDate(value).getMinutes());

  const now = new Date();
  const today = startOfDay(now);
  const isToday = sameDay(date, now);

  const selectedDateTime = new Date(date);
  selectedDateTime.setHours(hour, minute, 0, 0);

  const isPastDate = useCallback((day: Date) => startOfDay(day).getTime() < today.getTime(), [today.getTime()]);

  // Combine past-date restriction with the caller's date restrictions.
  const isDateDisabled = useCallback(
    (day: Date) => {
      if (isPastDate(day)) return true;

      if (!disabledDates) return false;

      const matchers = Array.isArray(disabledDates) ? disabledDates : [disabledDates];

      return matchers.some((matcher) => {
        if (typeof matcher === "function") return matcher(day);

        if (matcher instanceof Date) {
          return startOfDay(day).getTime() === startOfDay(matcher).getTime();
        }

        if (typeof matcher === "object" && matcher !== null) {
          if ("before" in matcher && matcher.before) {
            if (startOfDay(day) < startOfDay(matcher.before)) return true;
          }

          if ("after" in matcher && matcher.after) {
            if (startOfDay(day) > startOfDay(matcher.after)) return true;
          }

          if ("dayOfWeek" in matcher && matcher.dayOfWeek != null) {
            const days = Array.isArray(matcher.dayOfWeek) ? matcher.dayOfWeek : [matcher.dayOfWeek];

            if (days.includes(day.getDay())) return true;
          }

          if ("from" in matcher && "to" in matcher && matcher.from && matcher.to) {
            if (day >= startOfDay(matcher.from) && day <= matcher.to) {
              return true;
            }
          }
        }

        return false;
      });
    },
    [disabledDates, isPastDate],
  );

  // Keep internal state synchronized with externally supplied values.
  useEffect(() => {
    if (!value) return;

    const parsed = parseDate(value);
    if (!parsed) return;

    setDate(parsed);
    setHour(parsed.getHours());
    setMinute(parsed.getMinutes());
  }, [value]);

  // Emit only valid, non-past values.
  useEffect(() => {
    const selected = new Date(date);
    selected.setHours(hour, minute, 0, 0);

    if (selected.getTime() < Date.now()) return;

    const nextValue = toLocalISOString(selected);

    if (value !== nextValue) {
      onChange(nextValue);
    }
  }, [date, hour, minute, value, onChange]);

  const handleDateSelect = (selected?: Date) => {
    if (!selected) return;

    const nextDate = new Date(selected);
    nextDate.setHours(hour, minute, 0, 0);

    // If the selected time is in the past, use the next valid
    // five-minute interval from the current time.
    if (nextDate.getTime() < Date.now()) {
      const nextValid = roundUpToNextFiveMinutes(new Date());
      nextDate.setHours(nextValid.getHours(), nextValid.getMinutes(), 0, 0);
      setHour(nextValid.getHours());
      setMinute(nextValid.getMinutes());
    }

    setDate(nextDate);
  };

  const handleHourChange = (nextHour: number) => {
    setHour(nextHour);

    const next = new Date(date);
    next.setHours(nextHour, minute, 0, 0);

    if (next.getTime() < Date.now()) {
      const nextValid = roundUpToNextFiveMinutes(new Date());
      setHour(nextValid.getHours());
      setMinute(nextValid.getMinutes());
    }
  };

  const handleMinuteChange = (nextMinute: number) => {
    const next = new Date(date);
    next.setHours(hour, nextMinute, 0, 0);

    if (next.getTime() < Date.now()) return;

    setMinute(nextMinute);
  };

  const availableHours = Array.from({ length: 24 }, (_, h) => h).filter((h) => {
    if (!isToday) return true;
    return h >= now.getHours();
  });

  const availableMinutes = Array.from({ length: 60 / MINUTE_STEP }, (_, i) => i * MINUTE_STEP).filter((m) => {
    if (!isToday || hour !== now.getHours()) return true;
    return m >= Math.ceil(now.getMinutes() / MINUTE_STEP) * MINUTE_STEP;
  });

  return (
    <div className="min-w-0 space-y-1.5">
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" disabled={disabled} className={cn("w-full min-w-0 justify-between bg-card font-normal", className)}>
            <span className="flex min-w-0 items-center gap-2">
              {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
              <span className="truncate">
                {format(date, "dd MMM yyyy")} {pad(hour)}:{pad(minute)}
              </span>
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-0 space-y-3 p-3">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} disabled={isDateDisabled} className="m-0 w-full p-0" />

          <Separator />

          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div className="min-w-0 space-y-1.5">
              <Label className="text-xs text-muted-foreground">Hour</Label>

              <Select value={String(hour)} onValueChange={(v) => handleHourChange(Number(v))} disabled={disabled}>
                <SelectTrigger className="h-10 w-full bg-background font-medium">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent side="bottom" align="start" sideOffset={4} position="popper" className="max-h-40 overflow-y-auto">
                  {availableHours.map((h) => (
                    <SelectItem key={h} value={String(h)}>
                      {pad(h)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="pb-2 text-lg font-semibold text-muted-foreground">:</span>

            <div className="min-w-0 space-y-1.5">
              <Label className="text-xs text-muted-foreground">Minute</Label>

              <Select value={String(minute)} onValueChange={(v) => handleMinuteChange(Number(v))} disabled={disabled}>
                <SelectTrigger className="h-10 w-full bg-background font-medium">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent side="bottom" align="start" sideOffset={4} position="popper" className="max-h-40 overflow-y-auto">
                  {availableMinutes.map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {pad(m)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(DateTimePicker);
