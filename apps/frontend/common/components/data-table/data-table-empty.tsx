import { TableCell, TableRow } from "@/common/components/ui/table";
import { Inbox } from "lucide-react";

interface Props {
    colSpan: number;
    message: string;
}

export default function DataTableEmpty({ colSpan, message, }: Props) {
    return (
        <TableRow className="hover:bg-card!">
            <TableCell colSpan={colSpan} className="h-100 p-0">
                <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
                    <div className="flex size-21 items-center justify-center rounded-full bg-muted">
                        <Inbox className="size-12" />
                    </div>

                    <div className="text-center">
                        <p className="text-base font-medium text-foreground">
                            {message}
                        </p>
                        <p className="text-sm text-muted-foreground leading-3">
                            There are no records to display.
                        </p>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}