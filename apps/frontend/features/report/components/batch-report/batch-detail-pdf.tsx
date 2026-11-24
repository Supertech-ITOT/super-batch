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
import { batchMaterialPdfColunns } from "./batch-material-pdf-columns";
import { batchQualityCheckPdfColunns } from "./batch-quality-check-pdf";
import PDFStatsCard from "@/common/components/pdf/elements/PDFStatsCard";
import { PDFBadge } from "@/common/components/pdf/elements/PDFBadge";

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
      <PDFPage wrap>
        <View fixed>
          <PDFHeader
            title={title}
            subtitle={subtitle}
            companyName="SuperTech Automation"
            generatedBy="John Doe"
            generatedByEmail="john.doe@company.com"
          />
        </View>

        <Text style={styles.sectionTitle}>Batch Information</Text>
        <PDFGrid columns={5} gap={2}>
          {headerDetails.map((h) => (
            <View key={h.label}>
              <Text style={{ color: PDFTheme.muted, fontSize: 6 }}>{h.label}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 6 }}>{h.value}</Text>
            </View>
          ))}
        </PDFGrid>
        <Text style={styles.sectionTitle}>SOP Execution Details</Text>
        <PDFTable columns={batchSopsPdfColumns} data={batch.sops} />

        <View break>
          <Text style={styles.sectionTitle}>Batch Material Consumption</Text>
          <PDFStatsCard
            columns={4}
            data={batch.mat.statsData.map((s) => ({
              label: s.label,
              value: s.value,
              unit: s.unit,
              color: s.highlight ? (s.value < 0 ? PDFTheme.primary : s.value > 0 ? PDFTheme.destructive : undefined) : undefined,
            }))}
          />
          <PDFTable columns={batchMaterialPdfColunns} data={batch.mat.tableData} />
        </View>

        <View break>
          <Text style={styles.sectionTitle}>Batch Quality Check</Text>
          <PDFStatsCard
            columns={5}
            data={batch.qc.statsData.map((s) => ({
              label: s.label,
              value: s.value,
              color: s.isPassed === null ? PDFTheme.foreground : s.isPassed ? PDFTheme.primary : PDFTheme.destructive,
              unit: s.label === "Pass Rate" ? "%" : "",
            }))}
          />
          {batch.qc.list.map((q, idx) => (
            <View
              key={q.sampleNo ?? idx}
              style={{
                borderWidth: 1,
                borderColor: PDFTheme.border,
                padding: 4,
                marginTop: 4,
                borderRadius: 3,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: PDFTheme.primary, fontWeight: "bold", fontSize: 7 }}>#{q.sampleNo}</Text>
                <PDFBadge variant={q.failedParameters > 0 ? "destructive" : "default"}> {q.failedParameters > 0 ? "Failed" : "Passed"}</PDFBadge>
              </View>
              <Text style={{ color: PDFTheme.muted, fontSize: 6 }}>
                {q.sampleDateTime ? format(new Date(q.sampleDateTime), "dd MMM yyyy, hh:mm a") : "-"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  marginVertical: 3,
                  paddingVertical: 2,
                  justifyContent: "space-evenly",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: PDFTheme.border,
                }}
              >
                <Text style={{ color: PDFTheme.muted, fontSize: 6 }}>
                  Parameters: <Text style={{ fontWeight: "bold", color: PDFTheme.foreground }}>{q.totalParameters}</Text>
                </Text>

                <Text style={{ color: PDFTheme.muted, fontSize: 6 }}>
                  Passed: <Text style={{ fontWeight: "bold", color: PDFTheme.primary }}>{q.passedParameters}</Text>
                </Text>

                <Text style={{ color: PDFTheme.muted, fontSize: 6 }}>
                  Failed: <Text style={{ fontWeight: "bold", color: PDFTheme.destructive }}>{q.failedParameters}</Text>
                </Text>
              </View>

              <PDFTable columns={batchQualityCheckPdfColunns} data={q.results} />
            </View>
          ))}
        </View>
        <PDFFooter />
      </PDFPage>
    </PDFDocument>
  );
}
