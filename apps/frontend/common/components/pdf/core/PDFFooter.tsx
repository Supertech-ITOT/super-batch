import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFTheme } from "./PDFStyles";

interface PDFFooterProps {
  showPageNumbers?: boolean;
}

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    left: 35,
    right: 35,
    borderTopWidth: 0.7,
    borderTopColor: PDFTheme.border,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  text: {
    fontSize: 8,
    color: PDFTheme.secondary,
  },
});

export function PDFFooter({ showPageNumbers = true }: PDFFooterProps) {
  return (
    <View style={footerStyles.footer} fixed>
      {showPageNumbers && <Text style={footerStyles.text} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />}
    </View>
  );
}
