"use client";

import { flexRender, Row } from "@tanstack/react-table";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { alignClass, DataTableProps } from "./types";
import { TableCell, TableRow } from "@/common/components/ui/table";

interface DataTableRowProps<TData> {
    row: Row<TData>;
    rowClassName: string | ((row: TData) => string);
    contextMenu?: DataTableProps<TData, unknown>["contextMenu"];
    onClick?: () => void;
    onContextMenu?: () => void;
    isSelected?: boolean;
}

export default function DataTableRow<TData>({
    row,
    rowClassName,
    contextMenu,
    onClick,
    onContextMenu,
    isSelected,
}: DataTableRowProps<TData>) {
    const className =
        typeof rowClassName === "function"
            ? rowClassName(row.original)
            : rowClassName;

    const selectedClass = isSelected
        ? "bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-0 border-l-3! border-primary hover:from-primary/12 hover:via-primary/6 hover:to-transparent"
        : "hover:bg-muted/50";

    const cells = (
        <>
            {row.getVisibleCells().map((cell) => (
                <TableCell
                    key={cell.id}
                    className={`border-r last:border-r-0 px-2 sm:px-4 py-2 text-xs sm:text-sm ${alignClass[
                        cell.column.columnDef.meta?.align ?? "left"
                        ]
                        }`}
                >
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </TableCell>
            ))}
        </>
    );

    const tableRow = (
        <TableRow
            onClick={onClick}
            onContextMenu={onContextMenu}
            className={`${className} cursor-pointer ${selectedClass}`}
        >
            {cells}
        </TableRow>
    );

    if (!contextMenu) {
        return tableRow;
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {tableRow}
            </ContextMenuTrigger>

            <ContextMenuContent>
                {contextMenu.label && (
                    <ContextMenuLabel>
                        {contextMenu.label}
                    </ContextMenuLabel>
                )}

                {contextMenu.items.map((item) => {
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