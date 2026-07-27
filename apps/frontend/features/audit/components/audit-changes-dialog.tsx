import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import { Badge } from "@/common/components/ui/badge";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";

export interface AuditData {
    field: string;
    value: unknown;
}

interface AuditChangesDialogProps { open: boolean; onOpenChange: (open: boolean) => void; oldData: AuditData[]; newData: AuditData[]; }

function renderValue(value: unknown) {
    if (value === null || value === undefined) {
        return (
            <span className="italic text-muted-foreground">
                —
            </span>
        );
    }

    if (typeof value === "object") {
        return (
            <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }

    return String(value);
}

export default function AuditChangesDialog({
    open,
    onOpenChange,
    changes,
}: AuditChangesDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Audit Changes</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[70vh] pr-4">
                    <div className="space-y-4">
                        {changes.map((change) => (
                            <div
                                key={change.field}
                                className="rounded-lg border p-4"
                            >
                                <Badge variant="secondary" className="mb-4">
                                    {change.field}
                                </Badge>

                                <div className="grid grid-cols-11 gap-4 items-start">
                                    <div className="col-span-5 rounded-md border bg-red-50 p-3">
                                        <p className="mb-2 text-xs font-semibold uppercase text-red-600">
                                            Old Value
                                        </p>

                                        {renderValue(change.oldValue)}
                                    </div>

                                    <div className="col-span-1 flex justify-center pt-6">
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    <div className="col-span-5 rounded-md border bg-green-50 p-3">
                                        <p className="mb-2 text-xs font-semibold uppercase text-green-600">
                                            New Value
                                        </p>

                                        {renderValue(change.newValue)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}