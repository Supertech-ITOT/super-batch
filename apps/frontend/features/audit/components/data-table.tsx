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
import { useState } from "react";
import AuditFilter, { AuditFilterValue } from "./audit-filter";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { useGetBatchAuditAction } from "@/features/common/hooks/useMetadata";
import { toDisplayText } from "@/common/lib/format-enum";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter: AuditFilterValue;
  onFilterChange: (value: AuditFilterValue) => void;

  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}

const DataTable = <TData extends { id: number }, TValue>({
  columns,
  data,
  filter,
  onFilterChange,
  page,
  size,
  totalPages,
  totalElements,
  onPageChange,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data: users } = useGetUser();
  const { data: modules } = useGetModules();
  const { data: actions } = useGetBatchAuditAction();

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: page,
        pageSize: size,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getCoreRowModel().rows;
  const emptyRows = Math.max(0, size - rows.length);
  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex items-center justify-between">
        <AuditFilter
          filter={filter}
          onFilterChange={onFilterChange}
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
            onFilterChange({
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
      <div className="flex items-center justify-between py-2">
        <div className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.max(totalPages, 1)}
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
