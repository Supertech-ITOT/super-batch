import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Separator } from "@/common/components/ui/separator";

interface AuditChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  oldData?: string | null;
  newData?: string | null;
}

function renderValue(value: unknown) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function formatFieldName(field: string) {
  return field
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AuditChangesDialog({
  open,
  onOpenChange,
  oldData,
  newData,
}: AuditChangesDialogProps) {
  let oldObj: Record<string, any> = {};
  let newObj: Record<string, any> = {};

  try {
    oldObj = oldData ? JSON.parse(oldData) : {};
  } catch {
    oldObj = {};
  }

  try {
    newObj = newData ? JSON.parse(newData) : {};
  } catch {
    newObj = {};
  }

  const fields = Array.from(
    new Set([...Object.keys(oldObj), ...Object.keys(newObj)]),
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl! h-[80vh] p-0 flex flex-col overflow-hidden gap-0!">
        <DialogHeader className="px-6 py-3">
          <DialogTitle>Audit Changes</DialogTitle>
          <DialogDescription>
            Compare previous and current values.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-1 flex-col overflow-hidden p-6 ">
          {/* ================= LEFT : TABLE ================= */}
          <div className="h-full">
            <ScrollArea className="h-105">
              <Table>
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead className="w-56 font-semibold">Field</TableHead>
                    <TableHead className="font-semibold">Previous</TableHead>
                    <TableHead className="font-semibold">Current</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {fields.map((field) => {
                    const oldValue = renderValue(oldObj[field]);
                    const newValue = renderValue(newObj[field]);

                    const changed = oldValue !== newValue;

                    return (
                      <TableRow
                        key={field}
                        className="transition-colors hover:bg-muted/40"
                      >
                        <TableCell className="font-medium">
                          {formatFieldName(field)}
                        </TableCell>

                        <TableCell>
                          <div
                            className={`rounded-md border px-3 py-2 font-mono text-sm ${
                              changed
                                ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                                : "bg-muted/30"
                            }`}
                          >
                            {oldValue}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div
                            className={`rounded-md border px-3 py-2 font-mono text-sm ${
                              changed
                                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
                                : "bg-muted/30"
                            }`}
                          >
                            {newValue}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
