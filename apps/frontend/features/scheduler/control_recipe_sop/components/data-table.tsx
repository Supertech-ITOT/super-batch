"use client";

import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/common/components/ui/table";
import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "@/common/components/ui/context-menu";
import { ChevronsDown, ChevronsUp, CornerLeftDown, CornerLeftUp, LucideIcon, Plus, SquarePen, Trash } from "lucide-react";
import { controlRecipeSOPActionType } from "./control-recipe-sop-view";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAction: (action: controlRecipeSOPActionType, row: TData) => void;

}
type menuItemType = {
  label: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  action: controlRecipeSOPActionType;
}
const menuItem: menuItemType[] = [
  { label: "Add", icon: Plus, variant: "default", action: "create" },
  { label: "Insert Above", icon: CornerLeftUp, variant: "default", action: "insert-above" },
  { label: "Insert Below", icon: CornerLeftDown, variant: "default", action: "insert-below" },
  { label: "Move Up", icon: ChevronsUp, variant: "default", action: "move-up" },
  { label: "Move Down", icon: ChevronsDown, variant: "default", action: "move-down" },
  { label: "Edit", icon: SquarePen, variant: "default", action: "edit" },
  { label: "Delete", icon: Trash, variant: "destructive", action: "delete" }
];
const DataTable = <TData extends { id: number }, TValue>({ columns, data, onAction }: DataTableProps<TData, TValue>) => {
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
    initialState: { pagination: { pageSize: 10 } },
    state: { sorting, columnFilters },
  });

  const rows = table.getRowModel().rows;
  const emptyRows = Math.max(0, 10 - rows.length);

  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="min-w-0 overflow-y-auto scrollbar-none  ">
        <Table className="min-w-max min-h-120">
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
            {rows.length ? (
              <>
                {rows.map((row) => (
                  <ContextMenu key={row.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        className="border-muted-foreground/20 border-b h-12"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={`border-r border-muted-foreground/20 ${cell.column.id === "message"
                              ? "text-left"
                              : "text-center"
                              }`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>

                    <ContextMenuContent>
                      <ContextMenuLabel>Action</ContextMenuLabel>
                      {menuItem.map((item) => {
                        const Icon = item.icon;
                        return (
                          <ContextMenuItem
                            key={item.label}
                            variant={item.variant}
                            onClick={() => onAction(item.action, row.original)}
                          >
                            <Icon className="size-4" />
                            {item.label}
                          </ContextMenuItem>
                        );
                      })}
                    </ContextMenuContent>
                  </ContextMenu>
                ))}

                {/* Fake rows */}
                {Array.from({ length: emptyRows }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className="border-muted-foreground/20 border-b h-12"
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
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4 h-10">
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
