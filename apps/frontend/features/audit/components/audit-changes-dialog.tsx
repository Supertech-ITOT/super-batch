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
      <DialogContent className="max-w-5xl xl:max-w-6xl h-[70vh] p-0 overflow-hidden flex flex-col gap-0">
        <DialogHeader className="px-6 py-3">
          <DialogTitle>Audit Changes</DialogTitle>
          <DialogDescription>
            Compare previous and current values.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-1 flex-col overflow-hidden p-6 ">
          {/* ================= LEFT : TABLE ================= */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <Table className="table-fixed w-full">
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[20%] font-semibold">
                      Field
                    </TableHead>
                    <TableHead className="w-[40%] font-semibold">
                      Previous
                    </TableHead>
                    <TableHead className="w-[40%] font-semibold">
                      Current
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {fields.map((field) => {
                    const oldValue = renderValue(oldObj[field]);
                    const newValue = renderValue(newObj[field]);
                    return (
                      <TableRow
                        key={field}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {formatFieldName(field)}
                        </TableCell>

                        <TableCell>
                          <div
                            className={`font-mono text-sm bg-destructive/10 p-2`}
                          >
                            {oldValue}
                          </div>
                        </TableCell>

                        <TableCell className="">
                          <div
                            className={`font-mono text-sm bg-primary/10 p-2`}
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
