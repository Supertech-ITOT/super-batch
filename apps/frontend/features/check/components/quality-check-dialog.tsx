"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { useGetCheckParameters } from "@/features/plant/check-parameter/hooks/use-qualityCheck";
import { useCreateBatchCheck } from "../hooks/use-check";
import { batchCheckDefaultValues, type BatchCheckFormValues, batchCheckSchema } from "../schemas/check.schemas";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import { Button } from "@/common/components/ui/button";
import { DataTable } from "@/common/components/data-table/data-table";
import { qualityCheckColumns } from "./quality-check-dialog-column";
import type { CheckParameterResponse } from "@/features/plant/check-parameter/types/checkParameter.types";
import type { FieldArrayWithId, FieldErrors } from "react-hook-form";
import DataTableSearch from "@/common/components/data-table/data-table-search";

export type QualityCheckRow = FieldArrayWithId<BatchCheckFormValues, "results"> & {
  parameter: CheckParameterResponse;
  formIndex: number;
};
type Prop = {
  id: number;
};
export default function QualityCheckDialog({ id }: Prop) {
  const { mutateAsync: createBatchCheck, isPending: isCreating } = useCreateBatchCheck();
  const { data: checkParameters } = useGetCheckParameters();
  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<BatchCheckFormValues>({
    resolver: zodResolver(batchCheckSchema),
    defaultValues: batchCheckDefaultValues,
  });
  const { fields, replace, remove } = useFieldArray({ control, name: "results" });
  const watchedResults = useWatch({
    control,
    name: "results",
  });

  useEffect(() => {
    if (!checkParameters) return;
    replace(
      checkParameters.map((parameter) => ({
        checkParameterId: parameter.id,
        value: "",
      })),
    );
  }, [checkParameters, replace]);

  // Build the parameter lookup once instead of searching in every cell.
  const tableData = useMemo(() => {
    const parameterMap = new Map((checkParameters ?? []).map((parameter) => [parameter.id, parameter]));
    return fields.flatMap((field, formIndex) => {
      const parameter = parameterMap.get(field.checkParameterId);
      if (!parameter) return [];
      return [
        {
          ...field,
          value: watchedResults?.[formIndex]?.value ?? "",
          parameter,
          formIndex,
        },
      ];
    });
  }, [fields, checkParameters, watchedResults]);

  const columns = useMemo(() => qualityCheckColumns({ register, setValue, errors, remove }), [register, setValue, errors, remove]);
  const loading = isCreating || isSubmitting;

  const onSubmit = async (formData: BatchCheckFormValues) => {
    try {
      const res = await createBatchCheck({
        batchId: id,
        request: {
          results: formData.results,
        },
      });

      toast.success(res.message ?? "Batch check saved successfully");

      reset({
        ...batchCheckDefaultValues,
        results: (checkParameters ?? []).map((parameter) => ({
          checkParameterId: parameter.id,
          value: "",
        })),
      });
    } catch (error) {
      showApiError(error);
    }
  };

  const onInvalid = (errors: FieldErrors<BatchCheckFormValues>) => {
    toast.error(showFormError(errors));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex h-full min-h-0 flex-col gap-4">
      <div className="min-h-0 flex-1">
        <DataTable
          columns={columns}
          data={tableData}
          pageSize={10}
          emptyMessage="No check parameters added."
          showEmptyRows={false}
          toolbar={(table) => (
            <div className="flex items-center justify-between">
              <DataTableSearch table={table} column="name" placeholder="Search parameters..." />
              <Button type="submit" disabled={loading || fields.length === 0} className="min-w-32 px-5 h-10 text-sm text-white">
                {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save
              </Button>
            </div>
          )}
        />
      </div>
    </form>
  );
}
