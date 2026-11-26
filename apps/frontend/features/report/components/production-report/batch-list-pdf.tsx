import { Text, View } from "@react-pdf/renderer";
import { PDFHeader } from "@/common/components/pdf/core/PDFHeader";
import { PDFTable } from "@/common/components/pdf/elements/PDFTable";
import { PDFTheme } from "@/common/components/pdf/core/PDFStyles";
import { PDFDocument, PDFFooter, PDFPage } from "@/common/components/pdf";
import { PDFGrid } from "@/common/components/pdf/elements/PDFGrid";
import { ReportFilterDetails, ReportMetadataResponse } from "../../types/report.types";
import { format } from "date-fns";
import { BatchesResponse } from "../../types/report.types";
import { batchListPdfColumns } from "./batch-list-pdf-columns";

const title = "Batch Production Report";

const subtitle = "Track batch execution, production efficiency, processing time, quantity variances, and step-wise completion status.";

type Props = {
  detail: ReportFilterDetails;
  batches: BatchesResponse[];
  metadata: ReportMetadataResponse;
};

export default function BatchListPdf({ detail, batches, metadata }: Props) {
  const formatDate = (date?: Date) => (date ? format(date, "dd MMM yyyy") : "N/A");

  const headerDetails = [
    {
      label: "Date Range",
      value: detail.fromDate || detail.toDate ? `${formatDate(detail.fromDate)} - ${formatDate(detail.toDate)}` : "All Dates",
    },
    { label: "Batch Status", value: detail.batchStatus ?? "All Status" },
    { label: "Processing Unit", value: detail.unitName ?? "All Units" },
    { label: "Products", value: detail.productName ?? "All Products" },
    { label: "Master Recipe", value: detail.masterRecipeName ?? "All Recipes" },
  ];

  return (
    <PDFDocument title={title}>
      <PDFPage wrap>
        <View fixed>
          <PDFHeader
            title={title}
            subtitle={subtitle}
            companyName={metadata.companyName}
            generatedBy={metadata.generatedBy}
            generatedByEmail={metadata.generatedByEmail}
            generatedAt={metadata.generatedAt}
            companyLogo={metadata.companyLogo}
          />
        </View>
        <PDFGrid columns={5} gap={2} style={{ marginVertical: 16 }}>
          {headerDetails.map((h) => (
            <View key={h.label}>
              <Text style={{ fontWeight: "bold" }}>{h.label}</Text>
              <Text style={{ color: PDFTheme.muted, fontSize: 7 }}>{h.value}</Text>
            </View>
          ))}
        </PDFGrid>
        <PDFTable columns={batchListPdfColumns} data={batches} />
        <PDFFooter />
      </PDFPage>
    </PDFDocument>
  );
}
