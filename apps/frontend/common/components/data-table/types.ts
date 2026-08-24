import { ColumnDef, Table } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
    toolbar?: (table: Table<TData>) => React.ReactNode;
    emptyMessage?: string;
    className?: string;
    rowClassName?: string | ((row: TData) => string);
    tableClassName?: string;
    contextMenu?: {
        label?: string;
        items: {
            label: string;
            icon?: LucideIcon;
            variant?: "default" | "destructive";
            onClick: (row: TData) => void;
        }[];
    };
    serverPagination?: {
        pageIndex: number;
        pageCount: number;
        onPageChange: (pageIndex: number) => void;
    };
    onRowClick?: (row: TData) => void;
    isRowSelected?: (row: TData) => boolean;
}

export const alignClass = { left: "text-left", center: "text-center", right: "text-right", };