"use client";

import { flexRender, Row } from "@tanstack/react-table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "../ui/context-menu";
import { alignClass, DataTableProps } from "./types";
import { TableCell, TableRow } from "@/common/components/ui/table";

interface DataTableRowProps<TData> {
  row: Row<TData>;
  rowClassName: string | ((row: TData) => string);
  contextMenu?: DataTableProps<TData, unknown>["contextMenu"];
  onClick?: () => void;
  isSelected?: boolean;
  compact?: boolean;
}

export default function DataTableRow<TData>({ row, rowClassName, contextMenu, onClick, isSelected, compact = false }: DataTableRowProps<TData>) {
  const className = typeof rowClassName === "function" ? rowClassName(row.original) : rowClassName;

  const selectedClass = isSelected
    ? "bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-0 border-l-3! border-primary hover:from-primary/12 hover:via-primary/6 hover:to-transparent"
    : "hover:bg-muted/50";

  const cells = (
    <>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={`border-r last:border-r-0 ${compact ? "px-1.5 py-1 text-[10px] sm:px-2 sm:py-1.5 sm:text-xs" : "px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm"} ${alignClass[cell.column.columnDef.meta?.align ?? "left"]}`}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </>
  );

  const tableRow = (
    <TableRow onClick={onClick} className={`${className} cursor-pointer ${selectedClass}`}>
      {cells}
    </TableRow>
  );

  if (!contextMenu) {
    return tableRow;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{tableRow}</ContextMenuTrigger>

      <ContextMenuContent>
        {contextMenu.label && <ContextMenuLabel>{contextMenu.label}</ContextMenuLabel>}

        {contextMenu.items
          .filter((item) => item.show?.(row.original) ?? true)
          .map((item) => {
            const Icon = item.icon;

            return (
              <ContextMenuItem key={item.label} variant={item.variant} onClick={() => item.onClick(row.original)}>
                {Icon && <Icon className="size-4" />}
                {item.label}
              </ContextMenuItem>
            );
          })}
      </ContextMenuContent>
    </ContextMenu>
  );
}
