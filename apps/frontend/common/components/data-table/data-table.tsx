"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/common/components/ui/table";
import { DataTableProps } from "./types";
import DataTableEmpty from "./data-table-empty";
import DataTablePagination from "./data-table-pagination";
import { useState } from "react";
import DataTableRow from "./data-table-row";

export function DataTable<TData, TValue>({
  columns,
  onRowClick,
  isRowSelected,
  data,
  pageSize = 10,
  toolbar,
  emptyMessage = "No data available.",
  className,
  rowClassName = "h-12",
  tableClassName = "min-h-125",
  contextMenu,
  serverPagination,
  compact = false,
  showEmptyRows = true,
  fitContent = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination: serverPagination ? { pageIndex: serverPagination.pageIndex, pageSize } : pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    defaultColumn: {
      enableSorting: false,
    },
    onSortingChange: setSorting,
    onPaginationChange: serverPagination
      ? (updater) => {
          const currentPagination = {
            pageIndex: serverPagination.pageIndex,
            pageSize,
          };

          const nextPagination = typeof updater === "function" ? updater(currentPagination) : updater;

          serverPagination.onPageChange(nextPagination.pageIndex);
        }
      : setPagination,
    manualPagination: !!serverPagination,
    pageCount: serverPagination?.pageCount,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(!serverPagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
  });
  const rows = table.getRowModel().rows;
  const emptyRows = showEmptyRows ? Math.max(0, pageSize - rows.length) : 0;

  return (
    <div className={`flex flex-col gap-2 w-full min-w-0 ${fitContent ? "" : "h-full"} ${className ?? ""}`}>
      {toolbar?.(table)}
      <div className={`rounded-xl border overflow-hidden min-h-0 bg-card shadow-xs ${fitContent ? "" : "flex-1 h-full"}`}>
        <div className={`overflow-auto scrollbar-none ${fitContent ? "" : "h-full"} ${tableClassName}`}>
          <Table>
            <TableHeader className="sticky top-0 bg-primary">
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="hover:bg-primary">
                  {group.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`border-r last:border-r-0 text-center text-white ${compact ? "px-1.5 text-[10px] sm:px-2 sm:text-xs" : "px-2 text-xs sm:px-4 sm:text-sm"}`}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!header.column.getCanSort()}
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center justify-center gap-1 w-full"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{ asc: "↑", desc: "↓" }[header.column.getIsSorted() as string] ?? null}
                        </button>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.length ? (
                <>
                  {rows.map((row) => (
                    <DataTableRow
                      key={row.id}
                      row={row}
                      rowClassName={rowClassName}
                      contextMenu={contextMenu}
                      onClick={() => onRowClick?.(row.original)}
                      isSelected={isRowSelected?.(row.original)}
                      compact={compact}
                    />
                  ))}

                  {Array.from({ length: emptyRows }).map((_, index) => {
                    const emptyRowClass = typeof rowClassName === "function" ? rowClassName(undefined) : rowClassName;

                    return (
                      <TableRow key={`empty-${index}`} className={emptyRowClass}>
                        {columns.map((_, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className={`border-r last:border-r-0 ${
                              compact ? "px-1.5 py-1 text-[10px] sm:px-2 sm:py-1.5 sm:text-xs" : "px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm"
                            }`}
                          >
                            &nbsp;
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <DataTableEmpty colSpan={columns.length} message={emptyMessage} compact={compact} />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} serverPagination={serverPagination} compact={compact} />
    </div>
  );
}
