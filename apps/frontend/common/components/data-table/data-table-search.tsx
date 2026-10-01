"use client";

import { ChangeEvent } from "react";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

interface Props<TData> {
  table: Table<TData>;
  column: string;
  placeholder?: string;
  compact?: boolean;
}

export default function DataTableSearch<TData>({ table, column, placeholder = "Search...", compact = false }: Props<TData>) {
  const value = (table.getColumn(column)?.getFilterValue() as string) ?? "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.getColumn(column)?.setFilterValue(e.target.value);
  };

  return (
    <div className={`relative w-full ${compact ? "max-w-xs" : "max-w-sm"}`}>
      <Search className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${compact ? "size-3.5 sm:size-4" : "size-4"}`} />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-input bg-card pr-3 outline-none transition-colors placeholder:text-muted-foreground ${compact ? "h-7 pl-8 text-xs sm:h-8 sm:text-xs" : "h-8 pl-9 text-sm sm:h-10"}`}
      />
    </div>
  );
}
