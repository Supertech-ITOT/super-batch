import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props<TData> {
    table: Table<TData>;
    serverPagination?: {
        pageIndex: number;
        pageCount: number;
    };
}

export default function DataTablePagination<TData>({ table, serverPagination }: Props<TData>) {
    const { pageIndex } = table.getState().pagination;
    const pageCount = serverPagination?.pageCount ?? table.getPageCount();
    const canPrevious = serverPagination ? pageIndex > 0 : table.getCanPreviousPage();
    const canNext = serverPagination ? pageIndex < pageCount - 1 : table.getCanNextPage();
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm ">
                Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                <span className="font-medium">{pageCount}</span>
            </p>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!canPrevious}
                    className="inline-flex size-8 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                >
                    <ChevronLeft className="size-6" />
                </button>

                <span
                    key={pageIndex}
                    className="animate-in zoom-in duration-300 text-2xl font-bold text-primary"
                >
                    {pageIndex + 1}
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!canNext}
                    className="inline-flex size-8 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                >
                    <ChevronRight className="size-6" />
                </button>
            </div>
        </div>
    );
}