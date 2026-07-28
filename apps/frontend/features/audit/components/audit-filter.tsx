"use client";

import { useState } from "react";
import { CalendarIcon, RotateCcw, Search } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";

interface AuditFilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  fromDate?: Date;
  toDate?: Date;

  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;

  onReset: () => void;
  onApply: () => void;
}

export default function AuditFilter({
  search,
  onSearchChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onReset,
  onApply,
}: AuditFilterProps) {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  return (
    <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg border bg-background p-4 w-full">
      {/* Search */}
      <div className="w-72">
        <label className="mb-2 block text-sm font-medium">Search</label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder="Search audits..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* From Date */}
      <div className="w-56">
        <label className="mb-2 block text-sm font-medium">From Date</label>

        <Popover open={fromOpen} onOpenChange={setFromOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start font-normal",
                !fromDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {fromDate ? format(fromDate, "dd MMM yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={(date) => {
                onFromDateChange(date);
                setFromOpen(false);
              }}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* To Date */}
      <div className="w-56">
        <label className="mb-2 block text-sm font-medium">To Date</label>

        <Popover open={toOpen} onOpenChange={setToOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start font-normal",
                !toDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {toDate ? format(toDate, "dd MMM yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={(date) => {
                onToDateChange(date);
                setToOpen(false);
              }}
              disabled={(date) => {
                if (date > new Date()) return true;
                if (fromDate && date < fromDate) return true;
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
