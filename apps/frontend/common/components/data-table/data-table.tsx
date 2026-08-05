"use client";

import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, } from "@/common/components/ui/table";
import { DataTableProps } from "./types";
import DataTableEmpty from "./data-table-empty";
import DataTablePagination from "./data-table-pagination";
import { useState } from "react";

const alignClass = { left: "text-left", center: "text-center", right: "text-right", };
export function DataTable<TData, TValue>({ columns, data, pageSize = 10, toolbar, emptyMessage = "No data available.", className, rowClassName = "h-12", tableClassName = "min-h-125" }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        state: { columnFilters, },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });
    const rows = table.getRowModel().rows;
    const emptyRows = Math.max(0, pageSize - rows.length);

    return (
        <div className={`flex flex-col gap-2 h-full ${className ?? ""}`}>
            {toolbar?.(table)}
            <div className="rounded-xl border overflow-hidden flex-1 min-h-0 h-full">
                <div className={`h-full overflow-auto scrollbar-none ${tableClassName}`}>
                    <Table>
                        <TableHeader className="sticky top-0 bg-primary">
                            {table.getHeaderGroups().map(group => (
                                <TableRow key={group.id} className="hover:bg-primary">
                                    {group.headers.map(header => (
                                        <TableHead key={header.id} className="border-r last:border-r-0 text-center text-white text-xs sm:text-sm px-2 sm:px-4">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {rows.length
                                ? (
                                    <>
                                        {rows.map(row => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id} className={`border-r last:border-r-0 px-2 sm:px-4 py-2 text-xs sm:text-sm ${alignClass[cell.column.columnDef.meta?.align ?? "left"]}`}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}

                                        {Array.from({ length: emptyRows }).map((_, index) => (
                                            <TableRow key={`empty-${index}`}>
                                                {columns.map((_, cellIndex) => (
                                                    <TableCell key={cellIndex} className={`${rowClassName} border-r last:border-r-0`}>
                                                        &nbsp;
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </>
                                )
                                : (<DataTableEmpty colSpan={columns.length} message={emptyMessage} />)
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}