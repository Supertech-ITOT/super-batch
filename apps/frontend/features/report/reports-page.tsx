"use client";

import { AlertTriangle, Box, CheckCircle2, CircleGauge, FileBarChart, FileText, Package, TrendingUp } from "lucide-react";
import ReportCard from "./report-card";

type Report = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconClassName: string;
  iconBgClassName: string;
};

const REPORTS: Report[] = [
  {
    title: "Batch Report",
    description: "Detailed batch execution report with batch details, timings, parameters and status.",
    icon: FileText,
    iconClassName: "text-blue-600",
    iconBgClassName: "bg-blue-50 border-blue-100",
  },
  {
    title: "Batch Cycle",
    description: "View batch cycle times including start, end and step durations.",
    icon: CircleGauge,
    iconClassName: "text-emerald-500",
    iconBgClassName: "bg-emerald-50 border-emerald-100",
  },
  {
    title: "Batch Mat Var",
    description: "Material variation report for batches including planned vs actual consumption.",
    icon: Box,
    iconClassName: "text-orange-500",
    iconBgClassName: "bg-orange-50 border-orange-100",
  },
  {
    title: "Product Mat Var",
    description: "Material variation report by product including consumption trends.",
    icon: Package,
    iconClassName: "text-violet-600",
    iconBgClassName: "bg-violet-50 border-violet-100",
  },
  {
    title: "Parameter Trend",
    description: "Trend analysis of key process parameters during batch execution.",
    icon: TrendingUp,
    iconClassName: "text-cyan-500",
    iconBgClassName: "bg-cyan-50 border-cyan-100",
  },
  {
    title: "Parameter Log",
    description: "Detailed log of parameter values and changes with timestamps.",
    icon: FileBarChart,
    iconClassName: "text-rose-500",
    iconBgClassName: "bg-rose-50 border-rose-100",
  },
  {
    title: "Abort Batch",
    description: "Report of aborted batches with reasons, timestamps and related details.",
    icon: AlertTriangle,
    iconClassName: "text-teal-500",
    iconBgClassName: "bg-teal-50 border-teal-100",
  },
  {
    title: "Abort Report",
    description: "Summary report of all batch abort events and root causes.",
    icon: FileText,
    iconClassName: "text-red-500",
    iconBgClassName: "bg-red-50 border-red-100",
  },
  {
    title: "Quality Check",
    description: "Quality check results and inspection data for completed batches.",
    icon: CheckCircle2,
    iconClassName: "text-purple-500",
    iconBgClassName: "bg-purple-50 border-purple-100",
  },
];

export default function ReportsPage() {
  return (
    <section className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-340 px-6 py-7">
        {/* Page Header */}
        <div className="mb-6 border-b border-border pb-4"></div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {REPORTS.map((report) => (
            <ReportCard key={report.title} report={report} />
          ))}
        </div>
      </div>
    </section>
  );
}
