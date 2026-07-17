"use client";

import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/common/components/ui/table";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";
import { DialogProp } from "./recipe-view";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setDialog: React.Dispatch<React.SetStateAction<DialogProp>>;
}

const DataTable = <TData extends { id: number }, TValue>({ columns, data, setDialog, }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-2">
        <Input
          placeholder="Filter recipes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex mt-0 self-end ml-auto">
          <Button className="-mt-7 hover:bg-primary  text-white" onClick={() => setDialog({ action: "create", id: null, open: true })}>
            <Plus className="h-5 w-5 mr-2 " />
            Add Recipe
          </Button>
        </div>
      </div>
      <div className="rounded-md border min-h-160">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold border-r border-muted-foreground/20 last:border-r-0 text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext(),)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-muted-foreground/20 border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`border-r border-muted-foreground/20 ${cell.column.id === "description" || cell.column.id === "name" ? "text-left" : "text-center"}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
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
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
