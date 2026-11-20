import React from "react";
import { Document } from "@react-pdf/renderer";

interface PDFDocumentProps {
  children: React.ReactNode;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
}

export function PDFDocument({ children, title = "Report", author = "Company", subject, keywords }: PDFDocumentProps) {
  return (
    <Document title={title} author={author} subject={subject} keywords={keywords} creator="Company PDF System">
      {children}
    </Document>
  );
}
