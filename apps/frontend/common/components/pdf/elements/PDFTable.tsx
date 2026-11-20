import { View, Text } from "@react-pdf/renderer";
import { PDFTheme } from "../core/PDFStyles";

export type PDFColumnDef<T> = {
  accessorKey?: keyof T;
  header: string;
  width?: string;
  meta?: {
    align?: "left" | "center" | "right";
  };
  cell?: (props: { row: { original: T } }) => React.ReactNode;
};

interface Props<T> {
  columns: PDFColumnDef<T>[];
  data: T[];
}

export function PDFTable<T>({ columns, data }: Props<T>) {
  const columnStyle = (col: PDFColumnDef<T>) => ({
    width: col.width || undefined,
    flex: col.width ? undefined : 1,
  });

  return (
    <View>
      {/* Header */}
      <View
        fixed
        style={{
          flexDirection: "row",
          backgroundColor: PDFTheme.primary,
          padding: 4,
        }}
      >
        {columns.map((col) => (
          <Text
            key={String(col.accessorKey ?? col.header)}
            style={{
              ...columnStyle(col),
              color: PDFTheme.white,
              fontSize: 6,
              fontWeight: "bold",
              textAlign: col.meta?.align || "center",
            }}
          >
            {col.header}
          </Text>
        ))}
      </View>

      {/* Rows */}
      {data.map((row, rowIndex) => (
        <View
          key={rowIndex}
          wrap={false}
          style={{
            flexDirection: "row",
            padding: 4,
            backgroundColor: rowIndex % 2 === 0 ? PDFTheme.background : PDFTheme.card,
          }}
        >
          {columns.map((col) => (
            <View
              key={String(col.accessorKey ?? col.header)}
              style={{
                ...columnStyle(col),
                justifyContent: "center",
                alignItems: col.meta?.align === "left" ? "flex-start" : col.meta?.align === "right" ? "flex-end" : "center",
              }}
            >
              {col.cell ? (
                col.cell({ row: { original: row } })
              ) : (
                <Text
                  style={{
                    fontSize: 8,
                    textAlign: col.meta?.align || "center",
                  }}
                >
                  {String(col.accessorKey ? (row[col.accessorKey] ?? "-") : "-")}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
