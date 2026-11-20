import React from "react";
import { View, StyleSheet, type ViewProps } from "@react-pdf/renderer";
import { PDFTheme } from "../core/PDFStyles";

interface PDFGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  padding?: number;
  background?: string;
  border?: boolean;
  borderRadius?: number;
  style?: ViewProps["style"];
}

const localStyles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  item: {
    minWidth: 0,
  },
});

export function PDFGrid({ children, columns = 2, gap = 10, padding = 0, background, border = false, borderRadius = 6, style }: PDFGridProps) {
  const items = React.Children.toArray(children);
  const columnWidth = `${100 / columns}%`;

  return (
    <View
      style={[
        localStyles.grid,
        {
          padding,
          backgroundColor: background,
          borderWidth: border ? 1 : 0,
          borderColor: PDFTheme.border,
          borderRadius,
        },
        style,
      ]}
    >
      {items.map((child, index) => (
        <View
          key={index}
          style={[
            localStyles.item,
            {
              width: columnWidth,
              paddingRight: gap,
              paddingBottom: gap,
              flexGrow: 0,
              flexShrink: 0,
            },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
