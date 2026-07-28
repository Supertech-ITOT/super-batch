"use client";

import { CalendarIcon } from "lucide-react";
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
  return (
    <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg border bg-background p-4">
      {/* Search */}
      <div className="w-72">
        <label className="mb-2 block text-sm font-medium">Search</label>

        <Input
          placeholder="Search audits..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* From */}
      <div className="w-52">
        <label className="mb-2 block text-sm font-medium">From Date</label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start",
                !fromDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {fromDate ? format(fromDate, "dd MMM yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={onFromDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* To */}
      <div className="w-52">
        <label className="mb-2 block text-sm font-medium">To Date</label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start",
                !toDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {toDate ? format(toDate, "dd MMM yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={onToDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>

        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
