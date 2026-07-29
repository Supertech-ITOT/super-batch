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
import SearchableSelect, {
  SearchableSelectOption,
} from "@/common/components/form/searchable-select";

export type AuditFilterValue = {
  search: string;
  module?: number;
  action?: number;
  user?: number;
  fromDate?: Date;
  toDate?: Date;
};

type AuditFilterProps = {
  filter: AuditFilterValue;
  onFilterChange: (filter: AuditFilterValue) => void;

  modules: SearchableSelectOption[];
  actions: SearchableSelectOption[];
  users: SearchableSelectOption[];

  onReset: () => void;
};

export default function AuditFilter({
  filter,
  onFilterChange,
  modules,
  actions,
  users,
  onReset,
}: AuditFilterProps) {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const updateFilter = <K extends keyof AuditFilterValue>(
    key: K,
    value: AuditFilterValue[K],
  ) => {
    onFilterChange({
      ...filter,
      [key]: value,
    });
  };

  return (
    <div className="mb-4 flex flex-wrap items-end gap-2 rounded-lg border bg-background p-4 w-full">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-9 bg-card"
          placeholder="Search..."
          value={filter.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      {/* Module */}
      <div className="w-56">
        <SearchableSelect
          value={filter.module}
          onChange={(value) => updateFilter("module", value)}
          placeholder="Module"
          options={modules}
          className="text-bg-card "
        />
      </div>

      {/* Action */}
      <div className="w-56">
        <SearchableSelect
          value={filter.action}
          onChange={(value) => updateFilter("action", value)}
          placeholder="Action"
          options={actions}
          className="text-bg-card "
        />
      </div>

      {/* User */}
      <div className="w-56">
        <SearchableSelect
          value={filter.user}
          onChange={(value) => updateFilter("user", value)}
          placeholder="User"
          options={users}
          className="text-bg-card "
        />
      </div>

      {/* From Date */}
      <div className="w-56 bg-card">
        <Popover open={fromOpen} onOpenChange={setFromOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start",
                "bg-card hover:bg-card",
                "focus:bg-card focus-visible:bg-card",
                "active:bg-card",
                "data-[state=open]:bg-card",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filter.fromDate
                ? format(filter.fromDate, "dd MMM yyyy")
                : "From Date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filter.fromDate}
              onSelect={(date) => {
                updateFilter("fromDate", date);
                setFromOpen(false);
              }}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* To Date */}
      <div className="w-56">
        <Popover open={toOpen} onOpenChange={setToOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start",
                "bg-card hover:bg-card",
                "focus:bg-card focus-visible:bg-card",
                "active:bg-card",
                "data-[state=open]:bg-card",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filter.toDate ? format(filter.toDate, "dd MMM yyyy") : "To Date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filter.toDate}
              onSelect={(date) => {
                updateFilter("toDate", date);
                setToOpen(false);
              }}
              disabled={(date) => {
                if (date > new Date()) return true;
                if (filter.fromDate && date < filter.fromDate) return true;
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        onClick={onReset}
        className="bg-card hover:bg-card"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
