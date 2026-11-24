import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFTheme } from "../core/PDFStyles";

export interface PDFStatsData {
  label: string;
  value: number;
  color?: string;
  unit?: string;
}
type Props = {
  data: PDFStatsData[];
  columns?: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: PDFTheme.border,
    marginVertical: 4,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  label: {
    textAlign: "center",
    color: PDFTheme.muted,
    fontSize: 6,
  },
  value: {
    fontSize: 6,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default function PDFStatsCard({ data, columns = 4 }: Props) {
  const columnWidth = `${100 / columns}%`;

  return (
    <View style={styles.container}>
      {data.map((s, idx) => (
        <View
          key={idx}
          style={[
            styles.item,
            {
              width: `${100 / columns}%`,
              borderLeftWidth: idx % columns !== 0 ? 1 : 0,
              borderColor: PDFTheme.border,
            },
          ]}
        >
          <Text style={styles.label}>{s.label}</Text>
          <Text style={[styles.value, s.color ? { color: s.color } : {}]}>{`${s.value.toFixed(2)}${s.unit ? ` ${s.unit}` : ""}`}</Text>
        </View>
      ))}
    </View>
  );
}
