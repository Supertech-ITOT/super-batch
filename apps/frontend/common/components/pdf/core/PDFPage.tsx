import { Page } from "@react-pdf/renderer";
import { styles } from "./PDFStyles";

export function PDFPage({ children, ...props }: any) {
  return (
    <Page size="A4" style={styles.page} {...props}>
      {children}
    </Page>
  );
}
