"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { useState } from "react";
import AuditFilter from "./audit-filter";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData extends { id: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const filteredData = data.filter((item: any) => {
    const date = new Date(item.performedAt);
    if (fromDate && date < fromDate) {
      return false;
    }
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      if (date > end) {
        return false;
      }
    }

    return true;
  });
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } },
    state: { sorting, columnFilters },
  });
  const rows = table.getRowModel().rows;
  const emptyRows = Math.max(0, 8 - rows.length);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-2">
        <Input
          placeholder="Filter audits..."
          value={(table.getColumn("action")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("action")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AuditFilter
          search={(table.getColumn("action")?.getFilterValue() as string) ?? ""}
          onSearchChange={(value) =>
            table.getColumn("action")?.setFilterValue(value)
          }
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onReset={() => {
            setFromDate(undefined);
            setToDate(undefined);
          }}
          onApply={() => {
            // Optional:
            // Leave empty if filtering happens automatically.
            // If you fetch data from the backend, call your API here.
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table className="min-h-160">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold border-r border-muted-foreground/20 last:border-r-0 text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              <>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-muted-foreground/20 border-b"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`border-r border-muted-foreground/20 ${cell.column.id === "recipe" ? "text-left" : "text-center"}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {/* Empty Rows */}
                {Array.from({ length: emptyRows }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className="border-muted-foreground/20 border-b"
                  >
                    {columns.map((_, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className="border-r border-muted-foreground/20"
                      >
                        &nbsp;
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>

                {/* Fill remaining rows */}
                {Array.from({ length: 7 }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className="border-muted-foreground/20 border-b"
                  >
                    {columns.map((_, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className="border-r border-muted-foreground/20"
                      >
                        &nbsp;
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
