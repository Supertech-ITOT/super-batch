"use client";

import { Loader2, } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Separator } from "@/common/components/ui/separator";
import FeedbackState from "@/common/components/feedback-state";
import { useGetBatchAuditById } from "../hook/use-batch-audit";
import { ActionTypeBadgeStyles } from "../types/audit.types";
import DetailRow from "@/common/components/detail-row";
import AuditDetailTab from "./audit-detail-tab";
import { format, parseISO } from "date-fns";

interface AuditDetailDialogProps {
  id: number | null;
}

export default function AuditDetailCard({ id }: AuditDetailDialogProps) {
  const { data: audit, isError, isLoading } = useGetBatchAuditById(id!);
  const detailRows = [
    { label: "Audit ID", value: `#${audit?.id}`, },
    { label: "Module Name", value: audit?.module || "-", },
    { label: "Entity Name", value: audit?.entity || "-", },
    { label: "Performed By", value: audit?.performedBy?.name || "-", },
    { label: "Performed At", value: audit?.performedAt ? format(parseISO(audit.performedAt), "dd MMM yyyy hh:mm a") : "-", },
    { label: "User Type", value: audit?.performedBy?.role || "-", },
  ];


  if (!id) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center rounded-xl border bg-card">
        <p className="text-sm text-muted-foreground">
          Select an audit to view details
        </p>
      </div>)
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center rounded-xl border bg-card">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }
  if (isError) {
    return <FeedbackState variant="error" />;
  }
  if (!audit) {
    return <FeedbackState variant="empty" />;
  }



  return (
    <Card className="flex h-full min-h-0 w-full flex-col overflow-hidden border gap-0! py-3!">
      <CardHeader className="border-b gap-0! py-2!">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-primary! text-lg font-semibold!">Audit Details </CardTitle>
            <CardDescription>Audit information and field-level changes</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={ActionTypeBadgeStyles[audit.action as keyof typeof ActionTypeBadgeStyles]}
          >
            {audit.action}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-y-auto scrollbar-none space-y-3 p-4 sm:p-6">
        {/* Audit information */}
        <div className="grid grid-cols-1 gap-x-10">
          {detailRows.map((row) => (
            <DetailRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
        <Separator />
        {/* Changes */}
        <AuditDetailTab oldData={audit.oldData} newData={audit.newData} />
      </CardContent>
    </Card>
  );
}

