"use client";

import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, } from "@/common/components/ui/table";
import { DataTableProps } from "./types";
import DataTableEmpty from "./data-table-empty";
import DataTablePagination from "./data-table-pagination";
import { useState } from "react";
import DataTableRow from "./data-table-row";


export function DataTable<TData, TValue>({ columns, onRowClick, isRowSelected, data, pageSize = 10, toolbar, emptyMessage = "No data available.", className, rowClassName = "h-12", tableClassName = "min-h-125", contextMenu, serverPagination }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize, })
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination: serverPagination
                ? { pageIndex: serverPagination.pageIndex, pageSize, }
                : pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: serverPagination
            ? (updater) => {
                const currentPagination = {
                    pageIndex: serverPagination.pageIndex,
                    pageSize,
                };

                const nextPagination =
                    typeof updater === "function"
                        ? updater(currentPagination)
                        : updater;

                serverPagination.onPageChange(nextPagination.pageIndex);
            }
            : setPagination,
        manualPagination: !!serverPagination,
        pageCount: serverPagination?.pageCount,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        ...(!serverPagination && {
            getPaginationRowModel: getPaginationRowModel(),
        }),
    });
    const rows = table.getRowModel().rows;
    const emptyRows = Math.max(0, pageSize - rows.length);

    return (
        <div className={`flex flex-col gap-2 h-full ${className ?? ""}`}>
            {toolbar?.(table)}
            <div className="rounded-xl border overflow-hidden flex-1 min-h-0 h-full bg-card shadow-xs">
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
                                            <DataTableRow
                                                key={row.id}
                                                row={row}
                                                rowClassName={rowClassName}
                                                contextMenu={contextMenu}
                                                onClick={() => onRowClick?.(row.original)}
                                                isSelected={isRowSelected?.(row.original)}
                                            />
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
            <DataTablePagination table={table} serverPagination={serverPagination} />
        </div>
    );
}