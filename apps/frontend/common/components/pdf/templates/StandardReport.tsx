import { Document, Page, Text, View } from "@react-pdf/renderer";

import { PDFHeader } from "../core/PDFHeader";
import { PDFHighlight } from "../elements/PDFHighlight";
import { PDFTable } from "../elements/PDFTable";
import { styles } from "../core/PDFStyles";

export function StandardReport() {
  return (
    <Document title="Production Report">
      <Page size="A4" style={styles.page}>
        <PDFHeader title="Production Report" subtitle="Production summary and batch details" companyName="Your Company" />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <PDFHighlight title="Total Batches" value="125" type="info" />
          </View>

          <View style={{ flex: 1 }}>
            <PDFHighlight title="Completed" value="118" type="success" />
          </View>

          <View style={{ flex: 1 }}>
            <PDFHighlight title="Failed" value="7" type="danger" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Batch Details</Text>

        <PDFTable
          columns={[
            { header: "Batch ID", key: "id", width: "25%" },
            { header: "Product", key: "product", width: "45%" },
            { header: "Status", key: "status", width: "30%" },
          ]}
          data={[
            { id: "B001", product: "Material A", status: "Completed" },
            { id: "B002", product: "Material B", status: "Failed" },
          ]}
        />
      </Page>
    </Document>
  );
}
