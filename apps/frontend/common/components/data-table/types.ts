import { ColumnDef, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
    toolbar?: (table: Table<TData>) => React.ReactNode;
    emptyMessage?: string;
    className?: string;
    rowClassName?: string;
    tableClassName?: string;
}