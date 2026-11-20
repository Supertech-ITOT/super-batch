import { View, Text } from "@react-pdf/renderer";
import { PDFTheme } from "../core/PDFStyles";

interface PDFHighlightProps {
  title: string;
  value: string;
  type?: "success" | "warning" | "danger" | "info";
}

const colors = {
  success: { bg: PDFTheme.success + "20", text: PDFTheme.success },
  warning: { bg: PDFTheme.warning + "20", text: PDFTheme.warning },
  danger: { bg: PDFTheme.destructive + "20", text: PDFTheme.destructive },
  info: { bg: "#DBEAFE", text: "#1D4ED8" },
};

export function PDFHighlight({ title, value, type = "info" }: PDFHighlightProps) {
  const color = colors[type];

  return (
    <View
      style={{
        backgroundColor: color.bg,
        padding: 10,
        borderRadius: 5,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontSize: 8, color: color.text }}>{title}</Text>

      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: color.text,
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
