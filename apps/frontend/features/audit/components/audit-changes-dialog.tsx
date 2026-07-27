import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
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
    return JSON.stringify(value);
  }

  return String(value);
}

export default function AuditChangesDialog({
  open,
  onOpenChange,
  oldData,
  newData,
}: AuditChangesDialogProps) {
  const oldObj = oldData ? JSON.parse(oldData) : {};
  const newObj = newData ? JSON.parse(newData) : {};

  const fields = Array.from(
    new Set([...Object.keys(oldObj), ...Object.keys(newObj)]),
  );

  const oldJson = JSON.stringify(oldObj, null, 2);
  const newJson = JSON.stringify(newObj, null, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[85vh] max-w-7xl! p-0! items-start! flex flex-col gap-0!">
        <DialogHeader className="px-6 py-5">
          <DialogTitle>Audit Changes</DialogTitle>
          <DialogDescription>
            Compare previous and current values.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Tabs defaultValue="changes" className="flex h-full flex-col">
          <div className="px-6 py-4">
            <TabsList>
              <TabsTrigger value="changes">Tabular</TabsTrigger>

              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
          </div>

          {/* ---------------- TABLE ---------------- */}

          <TabsContent
            value="changes"
            className="mt-0 flex-1 overflow-hidden px-6 pb-6"
          >
            <ScrollArea className="h-full rounded-md border">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="w-64">Field</TableHead>

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
                        <TableCell className="font-medium">
                          {toDisplayText(field)}
                        </TableCell>

                        <TableCell className="font-mono text-sm break-all">
                          {renderValue(oldObj[field])}
                        </TableCell>

                        <TableCell className="font-mono text-sm break-all">
                          {renderValue(newObj[field])}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          {/* ---------------- JSON ---------------- */}

          <TabsContent
            value="json"
            className="mt-0 flex-1 overflow-hidden px-6 pb-6"
          >
            <div className="grid h-full grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="border-b px-4 py-3 font-semibold">
                  Previous JSON
                </div>

                <ScrollArea className="h-[calc(85vh-220px)]">
                  <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
                    {oldJson}
                  </pre>
                </ScrollArea>
              </Card>

              <Card className="overflow-hidden">
                <div className="border-b px-4 py-3 font-semibold">
                  Current JSON
                </div>

                <ScrollArea className="h-[calc(85vh-220px)]">
                  <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
                    {newJson}
                  </pre>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
