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
import { useEffect, useState } from "react";
import AuditFilter, { AuditFilterValue } from "./audit-filter";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { useGetBatchAuditAction } from "@/features/common/hooks/useMetadata";
import { toDisplayText } from "@/common/lib/format-enum";

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
  const { data: users } = useGetUser();
  const { data: modules } = useGetModules();
  const { data: actions } = useGetBatchAuditAction();
  const [filter, setFilter] = useState<AuditFilterValue>({
    search: "",
    module: undefined,
    action: undefined,
    user: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  const table = useReactTable({
    data: data,
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
  useEffect(() => {
    table.getColumn("action")?.setFilterValue(filter.search);
  }, [filter.search, table]);
  const rows = table.getRowModel().rows;
  const emptyRows = Math.max(0, 8 - rows.length);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-2">
        <AuditFilter
          filter={filter}
          onFilterChange={setFilter}
          modules={
            modules?.map((m) => ({
              label: toDisplayText(m.name),
              value: m.id,
            })) ?? []
          }
          actions={
            actions?.map((a, index) => ({
              label: a.label,
              value: index + 1, // temporary if a.value is a string
            })) ?? []
          }
          users={
            users?.map((u) => ({
              label: u.name,
              value: u.id,
            })) ?? []
          }
          onReset={() =>
            setFilter({
              search: "",
              module: undefined,
              action: undefined,
              user: undefined,
              fromDate: undefined,
              toDate: undefined,
            })
          }
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
