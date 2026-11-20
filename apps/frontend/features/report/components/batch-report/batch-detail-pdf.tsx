import { Text, View } from "@react-pdf/renderer";
import { PDFHeader } from "@/common/components/pdf/core/PDFHeader";
import { PDFTable } from "@/common/components/pdf/elements/PDFTable";
import { PDFTheme, styles } from "@/common/components/pdf/core/PDFStyles";
import { PDFDocument, PDFFooter, PDFPage } from "@/common/components/pdf";
import { PDFGrid } from "@/common/components/pdf/elements/PDFGrid";
import { format } from "date-fns";
import { BatchReportResponse } from "../../types/report.types";
import { minutesToADuration } from "@/common/utils/duration.util";
import batchSopsPdfColumns from "./batch-sops-pdf-columns";

const title = "Batch Report";
const subtitle = "Track batch execution, production efficiency, processing time, quantity variances, and step-wise completion status.";

type Props = {
  data: BatchReportResponse;
};
export default function BatchDetailPDF({ data: batch }: Props) {
  const headerDetails = [
    { label: "Batch Number", value: batch.info.batchNo ?? "-" },
    { label: "Unit", value: `${batch.info.unit.name ?? "-"} (${batch.info.unit.code ?? "-"})` },
    { label: "Product", value: `${batch.info.product.name ?? "-"} (${batch.info.product.code ?? "-"})` },
    { label: "Master Recipe", value: batch.info.masterRecipeName ?? "-" },
    { label: "Control Recipe", value: batch.info.controlRecipeName ?? "-" },
    { label: "Start Date", value: batch.info.startDateTime ? format(new Date(batch.info.startDateTime), "dd MMM yyyy, hh:mm a") : "-" },
    { label: "End Date", value: batch.info.endDateTime ? format(new Date(batch.info.endDateTime), "dd MMM yyyy, hh:mm a") : "-" },
    { label: "Standard Time", value: minutesToADuration(batch.info.standardTime) },
    { label: "Actual Time", value: minutesToADuration(batch.info.actualTime) },
    { label: "Variance Time", value: minutesToADuration(batch.info.varianceTime) },
    { label: "Standard Size", value: `${batch.info.standardSize.toFixed(2)} KG` },
    { label: "Actual Size", value: `${batch.info.actualSize.toFixed(2)} KG` },
    { label: "Variance Size", value: `${batch.info.varianceSize.toFixed(2)} KG` },
    { label: "Total Steps", value: batch.info.totalSteps },
    { label: "Completed Steps", value: batch.info.completedSteps },
    { label: "Status", value: batch.info.status },
    { label: "Shift Incharge", value: batch.info.shiftIncharge ?? "-" },
  ];
  return (
    <PDFDocument title={title}>
      <PDFPage>
        <PDFHeader
          title={title}
          subtitle={subtitle}
          companyName="SuperTech Automation"
          generatedBy="John Doe"
          generatedByEmail="john.doe@company.com"
        />
        <Text style={styles.sectionTitle}>Batch Information</Text>
        <PDFGrid columns={5} gap={2}>
          {headerDetails.map((h) => (
            <View key={h.label}>
              <Text style={{ fontWeight: "bold" }}>{h.label}</Text>
              <Text style={{ color: PDFTheme.muted, fontSize: 7 }}>{h.value}</Text>
            </View>
          ))}
        </PDFGrid>
        <Text style={styles.sectionTitle}>SOP Execution Details</Text>
        <PDFTable columns={batchSopsPdfColumns} data={batch.sops} />
        <Text style={styles.sectionTitle}>Batch Material Consumption</Text>
        <PDFTable columns={batchSopsPdfColumns} data={batch.sops} />
        <PDFFooter />
      </PDFPage>
    </PDFDocument>
  );
}
