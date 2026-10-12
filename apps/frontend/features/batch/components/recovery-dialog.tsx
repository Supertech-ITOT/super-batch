"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Beaker, CalendarClock, ClipboardList, Factory, Feather, Hash, Layers3, Workflow } from "lucide-react";
import { format } from "date-fns";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

import FormDialog from "@/common/components/form/form-dialog";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { Badge } from "@/common/components/ui/badge";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";

import { abortBatchDefaultValues, abortBatchSchema, AbortBatchSchema, AbortSchemaLimit } from "../schema/abort.schema";
import { useAbortBatch, useGetAbortDetails } from "../hook/use-batch";
import { BatchStatusBadgeStyles } from "../types/batch.types";
import { toDisplayText } from "@/common/lib/format-enum";

type Props = {
  open: boolean;
  onClose: () => void;
  batchId: number;
};

export default function RecoveryDialog({ open, onClose, batchId }: Props) {
  const { data: batch, isLoading } = useGetAbortDetails(batchId);
  const { mutateAsync: abortBatch, isPending } = useAbortBatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<AbortBatchSchema>({
    resolver: zodResolver(abortBatchSchema),
    defaultValues: abortBatchDefaultValues,
  });

  const loading = isLoading || isPending;

  const handleClose = () => {
    reset(abortBatchDefaultValues);
    onClose();
  };

  const onSubmit = async ({ remark }: AbortBatchSchema) => {
    if (!batch?.batchNo) return;

    try {
      const res = await abortBatch({
        batchNo: batch.batchNo,
        request: {
          remark,
          stepNo: batch.currentStepNo!,
        },
      });

      toast.success(res.message ?? `${batch.batchNo} aborted successfully.`);

      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };

  const onInvalid = (errors: FieldErrors<AbortBatchSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Abort Batch"
      description="Review batch details and provide a reason."
      submitDisabled={!isDirty || !batch}
      submitLabel="Abort"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      icon={AlertTriangle}
    >
      <div className="space-y-3">
        {/* Batch Information */}
        <div className="overflow-hidden rounded-xl border">
          <div className="flex items-center gap-2 border-b bg-card px-3 py-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
              <ClipboardList className="size-3.5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold">Batch Information</p>
              <p className="text-[11px] text-muted-foreground">Current execution details</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-1 p-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
              ))}
            </div>
          ) : batch ? (
            <div className="grid grid-cols-2 gap-px">
              <InfoItem icon={Hash} label="Batch" value={batch.batchNo} />

              <InfoItem
                icon={Layers3}
                label="Status"
                value={
                  <Badge
                    variant="outline"
                    className={`h-5 px-1.5 text-[10px] ${BatchStatusBadgeStyles[batch.status as keyof typeof BatchStatusBadgeStyles]}`}
                  >
                    {toDisplayText(batch.status)}
                  </Badge>
                }
              />

              <InfoItem icon={Beaker} label="Master Recipe" value={batch.masterRecipeName} />

              <InfoItem icon={Workflow} label="Control Recipe" value={batch.controlRecipeName} />

              <InfoItem icon={Factory} label="Unit" value={batch.unitName} />

              <InfoItem icon={ClipboardList} label="Current Step" value={batch.currentStepNo != null ? `Step ${batch.currentStepNo}` : "N/A"} />

              <InfoItem
                icon={CalendarClock}
                label="Started"
                value={batch.startDateTime ? format(new Date(batch.startDateTime), "dd MMM yyyy hh:mm a") : "N/A"}
                full
              />
            </div>
          ) : (
            <p className="p-3 text-xs text-muted-foreground">Batch information could not be loaded.</p>
          )}
        </div>

        {/* Warning */}
        <div className="flex items-center gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-destructive/10">
            <AlertTriangle className="size-3.5 text-destructive" />
          </div>

          <div>
            <p className="text-xs font-semibold text-destructive">Abort this batch?</p>
            <p className="text-[11px] text-muted-foreground">This action cannot be undone.</p>
          </div>
        </div>

        {/* Reason */}
        <TextAreaInput
          label="Abort Reason"
          placeholder="Enter reason..."
          icon={Feather}
          counter
          maxCharacters={AbortSchemaLimit.remark.max}
          maxLength={AbortSchemaLimit.remark.max}
          value={watch("remark")}
          disabled={loading}
          {...register("remark")}
        />
      </div>
    </FormDialog>
  );
}

type InfoItemProps = {
  icon: React.ElementType;
  label: string;
  value?: React.ReactNode;
  full?: boolean;
};

function InfoItem({ icon: Icon, label, value, full }: InfoItemProps) {
  return (
    <div className={`flex min-w-0 items-center gap-2 border px-3 py-2 ${full ? "col-span-2" : ""}`}>
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>

        <div className="truncate text-xs font-medium" title={typeof value === "string" ? value : undefined}>
          {value ?? "N/A"}
        </div>
      </div>
    </div>
  );
}
