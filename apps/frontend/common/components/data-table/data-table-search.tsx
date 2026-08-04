"use client";

import { ChangeEvent } from "react";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

interface Props<TData> {
    table: Table<TData>;
    column: string;
    placeholder?: string;
}

export default function DataTableSearch<TData>({
    table,
    column,
    placeholder = "Search...",
}: Props<TData>) {
    const value =
        (table.getColumn(column)?.getFilterValue() as string) ?? "";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        table.getColumn(column)?.setFilterValue(e.target.value);
    };

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-8 sm:h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground outline-none transition-colors"
            />
        </div>
    );
}