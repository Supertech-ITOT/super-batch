import { View, Text } from "@react-pdf/renderer";
import { PDFTheme } from "../core/PDFStyles";

type PDFBadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";

interface Props {
  children: React.ReactNode;
  variant?: PDFBadgeVariant;
  backgroundColor?: string;
  color?: string;
  compact?: boolean;
}

const badgeStyles: Record<PDFBadgeVariant, { backgroundColor: string; color: string; borderColor?: string }> = {
  default: {
    backgroundColor: PDFTheme.primary + "20",
    color: PDFTheme.primary,
    borderColor: PDFTheme.primary,
  },
  secondary: {
    backgroundColor: PDFTheme.card,
    color: PDFTheme.foreground,
    borderColor: PDFTheme.foreground,
  },
  destructive: {
    backgroundColor: PDFTheme.destructive + "20",
    color: PDFTheme.destructive,
    borderColor: PDFTheme.destructive,
  },
  outline: {
    backgroundColor: "transparent",
    color: PDFTheme.foreground,
    borderColor: PDFTheme.foreground,
  },
  ghost: {
    backgroundColor: "transparent",
    color: PDFTheme.foreground,
    borderColor: PDFTheme.foreground,
  },
  link: {
    backgroundColor: "transparent",
    color: PDFTheme.primary,
    borderColor: PDFTheme.primary,
  },
};

export function PDFBadge({ children, variant = "default", color, backgroundColor, compact = false }: Props) {
  const styles = badgeStyles[variant];
  const badgeColor = color ?? styles.color;

  return (
    <View
      style={{
        backgroundColor: backgroundColor ?? styles.backgroundColor,
        borderColor: PDFTheme.border ?? styles.borderColor,
        borderWidth: compact ? 0.3 : 0.5,
        borderRadius: compact ? 2 : 3,
        paddingHorizontal: compact ? 3 : 5,
        paddingVertical: compact ? 1 : 2,
      }}
    >
      <Text
        style={{
          fontSize: compact ? 5 : 6,
          fontWeight: "bold",
          color: badgeColor,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
