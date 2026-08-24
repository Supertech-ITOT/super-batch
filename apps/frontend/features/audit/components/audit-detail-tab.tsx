import { ChevronRight, Code2, } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/common/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/common/components/ui/table";
import { useMemo } from "react";
import { formatFieldName, formatValue, getChangedFields, parseJson } from "./audit-detail.utils";


interface AuditDetailTabProps {
    oldData: string;
    newData: string;
}

export default function AuditDetailTab({ oldData, newData }: AuditDetailTabProps) {
    const oldDataParsed = useMemo(() => parseJson(oldData), [oldData]);
    const newDataParsed = useMemo(() => parseJson(newData), [newData]);
    const changedFields = useMemo(() => getChangedFields(oldDataParsed, newDataParsed), [oldData, newData]);
    return (
        <div className="space-y-2">
            <div className="flex flex-row items-center justify-between gap-2">
                <h3 className="text-lg font-medium">Changes</h3>
                <p className="text-lg text-primary font-bold">{changedFields.length}</p>
            </div>
            <Tabs defaultValue="changed-fields">
                <TabsList className="w-full rounded-none border p-0! bg-card">
                    <TabsTrigger
                        value="changed-fields"
                        className="rounded-none border-0 border-b-3! data-[state=active]:border-primary! data-[state=active]:bg-primary/5! data-[state=active]:text-primary font-semibold"
                    >
                        Changed Fields
                    </TabsTrigger>
                    <TabsTrigger
                        value="json"
                        className="rounded-none border-0 border-b-3! data-[state=active]:border-primary! data-[state=active]:bg-primary/5! data-[state=active]:text-primary font-semibold"
                    >
                        Full JSON View
                    </TabsTrigger>
                </TabsList>

                {/* Changed fields */}
                <TabsContent value="changed-fields">
                    <div className="overflow-hidden border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead className="w-[28%] font-semibold">Field</TableHead>
                                    <TableHead className="w-[36%] font-semibold">Old Value</TableHead>
                                    <TableHead className="w-[36%] font-semibold">New Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {changedFields.length > 0 ? (changedFields.map(({ field, oldValue, newValue }) => (
                                    <TableRow key={field}>
                                        <TableCell className="text-sm font-medium">{formatFieldName(field)}</TableCell>
                                        <TableCell className="min-w-0 max-w-0">
                                            <div className="min-w-0 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                                                <span className="text-xs font-medium text-muted-foreground" title={formatValue(oldValue, field)}>
                                                    {formatValue(oldValue, field)}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="min-w-0 max-w-0">
                                            <div className="min-w-0 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                                                <span className="text-xs font-medium" title={formatValue(newValue, field)}>
                                                    {formatValue(newValue, field)}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">No changes available.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                {/* Full JSON */}
                <TabsContent value="json">
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                        <JsonPanel title="Old Data" data={oldDataParsed} />
                        <JsonPanel title="New Data" data={newDataParsed} />
                    </div>
                </TabsContent>
            </Tabs>

            {/* Raw data button */}
            <details className="group border">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Raw Data (JSON)</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t">
                    <pre className="max-h-87.5 overflow-auto scrollbar-none rounded-md bg-muted/50 p-4 text-xs leading-4">
                        {JSON.stringify({ oldDataParsed, newDataParsed }, null, 2)}
                    </pre>
                </div>
            </details>
        </div>
    );
}

function JsonPanel({ title, data, }: { title: string; data: Record<string, unknown>; }) {
    return (
        <div className="overflow-hidden border">
            <div className="border-b bg-muted/40 px-4 py-2.5">
                <p className="text-xs font-semibold">{title}</p>
            </div>
            <pre className="max-h-87.5 overflow-auto bg-muted/20 p-4 text-xs leading-4">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}