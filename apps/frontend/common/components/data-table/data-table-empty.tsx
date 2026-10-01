import { TableCell, TableRow } from "@/common/components/ui/table";
import { Inbox } from "lucide-react";

interface Props {
  colSpan: number;
  message: string;
  compact?: boolean;
}

export default function DataTableEmpty({ colSpan, message, compact = false }: Props) {
  return (
    <TableRow className="hover:bg-card!">
      <TableCell colSpan={colSpan} className={compact ? "h-60 p-0" : "h-100 p-0"}>
        <div className={`flex h-full flex-col items-center justify-center text-muted-foreground ${compact ? "gap-2 sm:gap-3" : "gap-4"}`}>
          <div className={`flex items-center justify-center rounded-full bg-muted ${compact ? "size-12 sm:size-16" : "size-21"}`}>
            <Inbox className={compact ? "size-6 sm:size-8" : "size-12"} />
          </div>

          <div className="text-center">
            <p className={compact ? "text-xs font-medium text-foreground sm:text-sm" : "text-base font-medium text-foreground"}>{message}</p>

            <p className={compact ? "mt-0.5 text-[10px] leading-3 text-muted-foreground sm:text-xs" : "text-sm leading-3 text-muted-foreground"}>There are no records to display.</p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
