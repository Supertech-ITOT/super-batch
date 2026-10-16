import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/common/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Badge } from "../ui/badge";

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
  compact?: boolean;
}

export function CollapsibleDataTable<T>({ title, data, columns, emptyText = "-", compact = false }: CollapsibleDataTableProps<T>) {
  const [open, setOpen] = useState(false);

  if (data.length === 0) {
    return <span className="text-xs text-muted-foreground">{emptyText}</span>;
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`w-full justify-between rounded border-border/80 bg-background font-medium shadow-none hover:bg-muted ${
            compact ? "h-6 px-1.5 text-[11px]" : "h-7 px-2 text-xs"
          }`}
        >
          <span className="flex min-w-0 items-center gap-1">
            {open ? (
              <ChevronDown className={`shrink-0 text-primary ${compact ? "size-3" : "size-3.5"}`} />
            ) : (
              <ChevronRight className={`shrink-0 text-primary ${compact ? "size-3" : "size-3.5"}`} />
            )}

            <span className="truncate">{title}</span>
          </span>

          <Badge
            variant="secondary"
            className={`ml-1 shrink-0 rounded-sm font-semibold tabular-nums ${
              compact ? "h-3.5 min-w-4 px-1 text-[9px]" : "h-4 min-w-4 px-1 text-[10px]"
            }`}
          >
            {data.length}
          </Badge>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className={compact ? "mt-1" : "mt-1.5"}>
        <div className="overflow-x-auto rounded border border-border/80">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                {columns.map((column) => (
                  <TableHead
                    key={column.header}
                    className={`whitespace-nowrap border-b border-border font-semibold text-white bg-primary ${
                      compact ? "h-5 px-1.5 py-0.5 text-[10px]" : "h-6 px-2 py-1 text-[11px]"
                    }`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="border even:bg-card/30 hover:bg-card/60">
                  {columns.map((column) => (
                    <TableCell
                      key={column.header}
                      className={`whitespace-nowrap text-foreground ${
                        compact ? "px-1.5 py-0.5 text-[11px] leading-4" : "px-2 py-1 text-xs leading-4"
                      } ${column.cellClassName ?? ""}`}
                    >
                      {column.render(item, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
