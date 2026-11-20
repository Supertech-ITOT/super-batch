
import { StyleSheet } from "@react-pdf/renderer";

export const PDFTheme = {
    primary: "#008029",
    secondary: "#475569",
    success: "#16A34A",
    destructive: "#e7000b",
    warning: "#D97706",
    background: "#ffffff",
    card: "#f5f5f7",
    muted: "#737373",
    border: "#e5e5e7",
    foreground: "#1d1d1f",
    white: "#ffffff"
};

export const styles = StyleSheet.create({
    // Page
    page: {
        paddingTop: 35,
        paddingBottom: 50,
        paddingHorizontal: 35,
        fontSize: 8,
        fontFamily: "Helvetica",
        color: PDFTheme.foreground,
        backgroundColor: PDFTheme.background,
    },

    // Typography
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: PDFTheme.primary,
    },

    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginVertical: 4,
        color: PDFTheme.primary,
    },

    muted: {
        color: PDFTheme.secondary,
    },

    // Layout
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: PDFTheme.border,
        marginVertical: 10,
    },
});
