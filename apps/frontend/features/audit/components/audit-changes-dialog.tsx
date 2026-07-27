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
import { Card } from "@/common/components/ui/card";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Separator } from "@/common/components/ui/separator";
import { toDisplayText } from "@/common/lib/format-enum";

interface AuditChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  oldData?: string | null;
  newData?: string | null;
}

function renderValue(value: unknown) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
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
      <DialogContent className="max-w-6xl! h-[50vh] p-0 flex flex-col overflow-hidden gap-0!">
        <DialogHeader className="px-6 py-5">
          <DialogTitle>Audit Changes</DialogTitle>
          <DialogDescription>
            Compare previous and current values.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-1 flex-col overflow-hidden p-6">
          {/* ================= LEFT : TABLE ================= */}
          <Card className="flex-[3] overflow-hidden">
            <div className="border-b px-4 py-0.5 flex items-center justify-between">
              <h3 className="font-semibold">Changed Fields</h3>
              <span className="text-sm text-muted-foreground">
                {fields.length} field{fields.length !== 1 && "s"}
              </span>
            </div>

            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-56">Field</TableHead>
                    <TableHead>Previous Value</TableHead>
                    <TableHead>Current Value</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {fields.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="h-32 text-center text-muted-foreground"
                      >
                        No audit data available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    fields.map((field) => (
                      <TableRow key={field}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {toDisplayText(field)}
                        </TableCell>

                        <TableCell className="font-mono break-all">
                          {renderValue(oldObj[field])}
                        </TableCell>

                        <TableCell className="font-mono break-all">
                          {renderValue(newObj[field])}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
