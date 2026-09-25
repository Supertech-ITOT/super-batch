import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { useMemo } from "react";
import {
  formatFieldName,
  formatValue,
  getChangedFields,
  parseJson,
} from "./audit-detail.utils";

interface AuditDetailTabProps {
  oldData: string;
  newData: string;
}

export default function AuditDetailTab({
  oldData,
  newData,
}: AuditDetailTabProps) {
  const oldDataParsed = useMemo(() => parseJson(oldData), [oldData]);
  const newDataParsed = useMemo(() => parseJson(newData), [newData]);

  const changedFields = useMemo(
    () => getChangedFields(oldDataParsed, newDataParsed),
    [oldData, newData],
  );

  const changedFieldNames = useMemo(
    () => new Set(changedFields.map(({ field }) => field)),
    [changedFields],
  );

  const allFields = useMemo(() => {
    const fields = new Set([
      ...Object.keys(oldDataParsed ?? {}),
      ...Object.keys(newDataParsed ?? {}),
    ]);

    return Array.from(fields).map((field) => ({
      field,
      oldValue: oldDataParsed?.[field],
      newValue: newDataParsed?.[field],
    }));
  }, [oldDataParsed, newDataParsed]);

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="text-lg font-medium">Entity Details</h3>

        <p className="text-lg text-primary font-bold">
          {changedFields.length} Changed
        </p>
      </div>

      <div className="overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[28%] font-semibold">
                Field
              </TableHead>

              <TableHead className="w-[36%] font-semibold">
                Old Value
              </TableHead>

              <TableHead className="w-[36%] font-semibold">
                New Value
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allFields.length > 0 ? (
              allFields.map(({ field, oldValue, newValue }) => {
                const isChanged = changedFieldNames.has(field);

                return (
                  <TableRow key={field}>
                    <TableCell className="text-sm font-medium">
                      {formatFieldName(field)}
                    </TableCell>

                    <TableCell className="min-w-0 max-w-0">
                      <div className="min-w-0 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                        <span
                          className={`text-xs font-medium ${isChanged
                              ? "text-destructive"
                              : "text-muted-foreground"
                            }`}
                          title={formatValue(oldValue, field)}
                        >
                          {formatValue(oldValue, field)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="min-w-0 max-w-0">
                      <div className="min-w-0 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                        <span
                          className={`text-xs font-medium ${isChanged
                              ? "text-primary"
                              : ""
                            }`}
                          title={formatValue(newValue, field)}
                        >
                          {formatValue(newValue, field)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No entity data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}