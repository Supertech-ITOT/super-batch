"use client";
import { flexRender, Row } from "@tanstack/react-table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "../ui/context-menu";
import { alignClass, DataTableProps } from "./types";
import { TableCell, TableRow } from "../ui/table";

export default function DataTableRow<TData>({ row, rowClassName, contextMenu, }: {
    row: Row<TData>;
    rowClassName: string | ((row: TData) => string);
    contextMenu?: DataTableProps<TData, unknown>["contextMenu"];
}) {
    const className = typeof rowClassName === "function" ? rowClassName(row.original) : rowClassName;
    const cells = (
        <>
            {row.getVisibleCells().map(cell => (
                <TableCell
                    key={cell.id}
                    className={`border-r last:border-r-0 px-2 sm:px-4 py-2 text-xs sm:text-sm ${alignClass[cell.column.columnDef.meta?.align ?? "left"]}`}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </>
    );

    if (!contextMenu) {
        return <TableRow className={className}>{cells}</TableRow>;
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <TableRow className={className}>{cells}</TableRow>
            </ContextMenuTrigger>
            <ContextMenuContent>
                {contextMenu.label && (
                    <ContextMenuLabel>{contextMenu.label}</ContextMenuLabel>
                )}

                {contextMenu.items.map(item => {
                    const Icon = item.icon;
                    return (
                        <ContextMenuItem
                            key={item.label}
                            variant={item.variant}
                            onClick={() => item.onClick(row.original)}
                        >
                            {Icon && <Icon className="size-4" />}
                            {item.label}
                        </ContextMenuItem>
                    );
                })}
            </ContextMenuContent>
        </ContextMenu>
    );
}