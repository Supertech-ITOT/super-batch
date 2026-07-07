import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/common/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/common/components/ui/table";
import { Badge } from "./ui/badge";

export interface CollapsibleTableColumn<T> {
    header: string;
    cellClassName?: string;
    render: (item: T, index: number) => React.ReactNode;
}
interface CollapsibleDataTableProps<T> {
    title: string;
    data: T[];
    columns: CollapsibleTableColumn<T>[];
    emptyText?: string;
}

export function CollapsibleDataTable<T>({ title, data, columns, emptyText = "-", }: CollapsibleDataTableProps<T>) {
    const [open, setOpen] = useState(false);
    if (data.length === 0) {
        return <span className="text-muted-foreground">{emptyText}</span>;
    }

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-5 w-full justify-between rounded px-2 py-0 text-xs font-medium shadow-none hover:bg-muted"
                >
                    <div className="flex items-center gap-1.5">
                        {open ? (
                            <ChevronDown className="size-3.5 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="size-3.5 text-muted-foreground" />
                        )}
                        <span>{title}</span>
                    </div>

                    <Badge
                        variant="outline"
                        className="size-3.5 rounded px-1 text-[10px] font-semibold bg-primary/10 text-primary"
                    >
                        {data.length}
                    </Badge>
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-2">
                <Table className="border">
                    <TableHeader>
                        <TableRow className="bg-primary/10 hover:bg-primary/10 h-5">
                            {columns.map((column) => (
                                <TableHead key={column.header} className="h-5 whitespace-nowrap border text-xs text-center font-semibold text-primary">
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} className="h-4! even:bg-muted/40">
                                {columns.map((column) => (
                                    <TableCell key={column.header} className={`h-4! p-0.5 whitespace-nowrap border text-xs ${column.cellClassName ?? ""}`}>
                                        {column.render(item, index)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CollapsibleContent>
        </Collapsible>
    );
}